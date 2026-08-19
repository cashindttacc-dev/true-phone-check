import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

/** Landing hero: headline, centered search bar, primary CTAs. */
export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_50%_0%,oklch(1_0_0/0.18),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/90">
          <BadgeCheck className="size-3.5 text-success" />
          Trusted device authenticity checks
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-6xl">
          Find and Verify <span className="text-success">Original</span> Phones.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/70 sm:text-lg">
          Browse genuine devices from trusted brands and confirm any handset&apos;s IMEI before
          money changes hands.
        </p>

        {/* Centered search bar — submits into the catalog page */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: query || undefined } });
          }}
          className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-2 backdrop-blur transition-colors focus-within:border-success/60"
        >
          <Search className="ml-2 size-5 shrink-0 text-primary-foreground/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search iPhone 15, Galaxy S24, Pixel 8…"
            aria-label="Search phones"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-success px-4 text-sm font-semibold text-success-foreground transition-transform hover:scale-[1.02]"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/search"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90 sm:w-auto"
          >
            <Search className="size-4" /> Search Phones
          </Link>
          <Link
            to="/verify"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
          >
            <ShieldCheck className="size-4" /> Verify Authenticity
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
