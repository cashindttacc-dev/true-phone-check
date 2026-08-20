import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

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
    }
  | { found: false; imei: string };

/** Looks up an IMEI in the registry table using the public (anon) read policy. */
export const lookupImei = createServerFn({ method: "POST" })
  .inputValidator((input: { imei: string }) => imeiSchema.parse(input))
  .handler(async ({ data }): Promise<ImeiLookupResult> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data: row, error } = await supabase
      .from("imei_records")
      .select("imei, brand, model, storage, purchase_region, warranty_status, warranty_until, authentic")
      .eq("imei", data.imei)
      .maybeSingle();

    if (error) {
      console.error("IMEI lookup failed", error);
      throw new Error("Registry lookup failed. Please try again.");
    }

    if (!row) return { found: false, imei: data.imei };

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
    };
  });
