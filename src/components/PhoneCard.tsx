import { BadgeCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { formatNaira, type Phone } from "@/data/phones";

/** Single catalog card: artwork (with graceful fallback), name, price, authenticity badge. */
export function PhoneCard({ phone }: { phone: Phone }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(150deg, oklch(0.95 0.03 ${phone.accent}), oklch(0.88 0.06 ${phone.accent}))`,
        }}
      >
        {imageFailed ? (
          <div className="flex h-28 w-16 items-center justify-center rounded-xl border border-foreground/10 bg-background/70 shadow-card transition-transform duration-300 group-hover:scale-105">
            <Smartphone className="size-6 text-primary" />
          </div>
        ) : (
          <img
            src={phone.image}
            alt={`${phone.brand} ${phone.name}`}
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {phone.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-success-foreground">
            <BadgeCheck className="size-3" /> Verified Original
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2 py-1 text-[11px] font-semibold text-foreground">
          {phone.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{phone.brand}</p>
          <h3 className="truncate text-base font-semibold text-foreground">{phone.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {phone.storage} · {phone.display} · {phone.os}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-bold text-foreground">
              {formatNaira(phone.price)}
            </span>
            <span className="text-[11px] text-muted-foreground">≈ ${phone.priceUsd}</span>
          </span>
          <button
            type="button"
            className="shrink-0 rounded-md border border-input px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
