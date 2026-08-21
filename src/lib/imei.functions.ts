import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const imeiSchema = z.object({
  imei: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 15, {
      message: "Enter a valid 15-digit IMEI or serial number.",
    }),
});

export type ImeiLookupResult =
  | {
      found: true;
      imei: string;
      brand: string;
      model: string;
      storage: string;
      purchaseRegion: string;
      warranty: string;
      warrantyUntil: string;
      authentic: boolean;
      source: "api" | "registry";
      details?: { label: string; value: string }[];
    }
  | { found: false; imei: string; source: "api" | "registry"; message?: string };

const EMPTY = ["", "-", "n/a", "na", "unknown", "null", "undefined"];

function pick(record: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const match = Object.keys(record).find(
      (k) => k.toLowerCase().replace(/[\s_-]/g, "") === key.toLowerCase().replace(/[\s_-]/g, ""),
    );
    if (!match) continue;
    const value = record[match];
    if (value === null || value === undefined) continue;
    const text = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value).trim();
    if (!EMPTY.includes(text.toLowerCase())) return text;
  }
  return undefined;
}

/** Calls the RapidAPI IMEI checker. Returns null when the service is unavailable. */
async function lookupViaRapidApi(imei: string): Promise<ImeiLookupResult | null> {
  const apiKey = process.env["IMEI_API_KEY"];
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://kelpom-imei-checker1.p.rapidapi.com/api/?imei=${encodeURIComponent(imei)}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "kelpom-imei-checker1.p.rapidapi.com",
        },
      },
    );

    const raw = (await response.json()) as unknown;
    if (!response.ok) {
      console.error("RapidAPI IMEI lookup failed", response.status, raw);
      return null;
    }

    const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const inner =
      payload["result"] && typeof payload["result"] === "object"
        ? (payload["result"] as Record<string, unknown>)
        : payload["data"] && typeof payload["data"] === "object"
          ? (payload["data"] as Record<string, unknown>)
          : payload;

    const brand = pick(inner, ["brand", "brandName", "manufacturer", "make"]);
    const model = pick(inner, ["model", "modelName", "name", "deviceName", "device"]);
    if (!brand && !model) {
      const message = pick(inner, ["message", "error", "status"]);
      // No recognisable device payload — treat as service noise, not a verdict.
      if (message) console.error("RapidAPI IMEI response without device data", message);
      return null;
    }

    const knownKeys = new Set([
      "brand",
      "brandname",
      "manufacturer",
      "make",
      "model",
      "modelname",
      "name",
      "devicename",
      "device",
      "storage",
      "capacity",
      "memory",
      "country",
      "purchasecountry",
      "purchaseregion",
      "region",
      "warranty",
      "warrantystatus",
      "warrantyuntil",
      "estimatedpurchasedate",
      "imei",
    ]);

    const details = Object.entries(inner)
      .filter(([key, value]) => {
        if (knownKeys.has(key.toLowerCase().replace(/[\s_-]/g, ""))) return false;
        return value !== null && typeof value !== "object";
      })
      .slice(0, 8)
      .map(([key, value]) => ({
        label: key
          .replace(/[_-]/g, " ")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (c) => c.toUpperCase()),
        value: typeof value === "boolean" ? (value ? "Yes" : "No") : String(value),
      }))
      .filter((d) => !EMPTY.includes(d.value.trim().toLowerCase()));

    return {
      found: true,
      imei,
      brand: brand ?? "—",
      model: model ?? "—",
      storage: pick(inner, ["storage", "capacity", "memory"]) ?? "—",
      purchaseRegion:
        pick(inner, ["purchaseCountry", "country", "purchaseRegion", "region"]) ?? "—",
      warranty: pick(inner, ["warrantyStatus", "warranty"]) ?? "Unknown",
      warrantyUntil: pick(inner, ["warrantyUntil", "estimatedPurchaseDate"]) ?? "—",
      authentic: true,
      source: "api",
      details,
    };
  } catch (err) {
    console.error("RapidAPI IMEI lookup threw", err);
    return null;
  }
}

/** Looks up an IMEI via the RapidAPI checker, falling back to the local registry table. */
export const lookupImei = createServerFn({ method: "POST" })
  .inputValidator((input: { imei: string }) => imeiSchema.parse(input))
  .handler(async ({ data }): Promise<ImeiLookupResult> => {
    const apiResult = await lookupViaRapidApi(data.imei);
    if (apiResult) return apiResult;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("imei_records")
      .select("imei, brand, model, storage, purchase_region, warranty_status, warranty_until, authentic")
      .eq("imei", data.imei)
      .maybeSingle();

    if (error) {
      console.error("IMEI lookup failed", error);
      throw new Error("Registry lookup failed. Please try again.");
    }

    if (!row) return { found: false, imei: data.imei, source: "registry" };

    return {
      found: true,
      imei: row.imei,
      brand: row.brand,
      model: row.model,
      storage: row.storage,
      purchaseRegion: row.purchase_region,
      warranty: row.warranty_status,
      warrantyUntil: row.warranty_until
        ? new Date(row.warranty_until).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—",
      authentic: row.authentic,
      source: "registry",
    };
  });
