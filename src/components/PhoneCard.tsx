import { BadgeCheck, Smartphone } from "lucide-react";
import type { Phone } from "@/data/phones";

/** Single catalog card: placeholder artwork, name, price, authenticity badge. */
export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
      {/* Placeholder image area (no external assets needed) */}
      <div
        className="relative flex h-44 items-center justify-center"
        style={{
          background: `linear-gradient(150deg, oklch(0.95 0.03 ${phone.accent}), oklch(0.88 0.06 ${phone.accent}))`,
        }}
      >
        <div className="flex h-28 w-16 items-center justify-center rounded-xl border border-foreground/10 bg-background/70 shadow-card transition-transform duration-300 group-hover:scale-105">
          <Smartphone className="size-6 text-primary" />
        </div>
        {phone.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-success-foreground">
            <BadgeCheck className="size-3" /> Verified Original
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{phone.brand}</p>
          <h3 className="text-base font-semibold text-foreground">{phone.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {phone.storage} · {phone.display} · {phone.os}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-lg font-bold text-foreground">${phone.price}</span>
          <button
            type="button"
            className="rounded-md border border-input px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
