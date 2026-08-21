import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  BadgeCheck,
  HelpCircle,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { lookupImei, type ImeiLookupResult } from "@/lib/imei.functions";
import { detectModelFromImei, formatNaira } from "@/data/phones";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** IMEI / serial number checker backed by the Cloud IMEI registry. */
export function IMEIForm() {
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImeiLookupResult | null>(null);
  const runLookup = useServerFn(lookupImei);

  const digits = imei.replace(/\D/g, "");
  const detected = useMemo(() => detectModelFromImei(digits), [digits]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (digits.length !== 15) {
      setError("Enter a valid 15-digit IMEI or serial number.");
      return;
    }
    setLoading(true);
    try {
      setResult(await runLookup({ data: { imei: digits } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="imei" className="text-sm font-semibold text-foreground">
            IMEI or Serial Number
          </label>

          {/* Helper modal: how to find your IMEI */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <HelpCircle className="size-3.5" /> How to find your IMEI
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finding your IMEI</DialogTitle>
                <DialogDescription>Three quick ways to get the 15-digit number.</DialogDescription>
              </DialogHeader>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">Dial code:</span> open the phone
                  dialer and enter <code className="rounded bg-muted px-1.5 py-0.5">*#06#</code>.
                </li>
                <li>
                  <span className="font-semibold text-foreground">iPhone:</span> Settings → General
                  → About.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Android:</span> Settings → About
                  phone → IMEI. It is also printed on the retail box.
                </li>
              </ul>
            </DialogContent>
          </Dialog>
        </div>

        <input
          id="imei"
          inputMode="numeric"
          autoComplete="off"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="e.g. 356938035643809"
          className="mt-3 h-12 w-full rounded-lg border border-input bg-background px-4 font-mono text-base tracking-wider text-foreground transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
        <p className="mt-2 text-xs text-muted-foreground">{digits.length}/15 digits entered</p>

        {/* Live TAC (first 8 digits) → detected model */}
        {detected && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-3">
            <img
              src={detected.phone.imageUrl}
              alt={`${detected.phone.brand} ${detected.phone.model}`}
              loading="lazy"
              width={768}
              height={576}
              className="size-14 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Detected model · TAC {digits.slice(0, 8)}
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {detected.phone.brand} {detected.phone.model}
              </p>
              <p className="text-xs text-muted-foreground">
                {detected.phone.storage} · {formatNaira(detected.phone.price)}
                {detected.exact ? "" : " · closest catalog match"}
              </p>
            </div>
          </div>
        )}



        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Checking device registry…
            </>
          ) : (
            <>
              <ShieldCheck className="size-4" /> Verify Authenticity
            </>
          )}
        </button>

        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2.5 text-sm font-medium text-warning">
            <ShieldAlert className="size-4 shrink-0" /> {error}
          </p>
        )}
      </form>

      {/* Not found in registry */}
      {result && !result.found && (
        <div className="overflow-hidden rounded-2xl border border-destructive/40 bg-card">
          <div className="flex items-center gap-3 bg-destructive px-5 py-4 text-destructive-foreground">
            <ShieldAlert className="size-6" />
            <div>
              <p className="font-display text-lg font-bold">Not Found in Registry</p>
              <p className="text-xs opacity-90">IMEI {result.imei} has no matching record</p>
            </div>
          </div>
          <p className="px-5 py-4 text-sm text-muted-foreground">
            This device could not be verified. Double-check the digits, then treat the handset as
            unverified until the seller can produce matching documentation.
          </p>
        </div>
      )}

      {/* Verified result card */}
      {result?.found && (
        <div className="overflow-hidden rounded-2xl border border-success/40 bg-card shadow-glow">
          <div className="flex items-center gap-3 bg-success px-5 py-4 text-success-foreground">
            <BadgeCheck className="size-6" />
            <div>
              <p className="font-display text-lg font-bold">Verified Original</p>
              <p className="text-xs opacity-90">IMEI {result.imei} found in the registry</p>
            </div>
          </div>
          <dl className="grid gap-px bg-border sm:grid-cols-2">
            {[
              ["Brand", result.brand],
              ["Model", result.model],
              ["Storage", result.storage],
              ["Purchase region", result.purchaseRegion],
              ["Warranty status", result.warranty],
              ["Covered until", result.warrantyUntil],
              ...(result.details ?? []).map((d) => [d.label, d.value] as const),
            ].map(([label, value]) => (
              <div key={label} className="bg-card px-5 py-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {label === "Warranty status" ? (
                    <span
                      className={`inline-flex items-center gap-1.5 ${
                        value === "Active" ? "text-success" : "text-warning"
                      }`}
                    >
                      <BadgeCheck className="size-4" /> {value}
                    </span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="flex items-center gap-2 border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <Smartphone className="size-3.5" />{" "}
            {result.source === "api"
              ? "Result served live from the global IMEI checker API."
              : "Result served from the TruePhone device registry."}
          </p>
        </div>
      )}

    </div>
  );
}
