import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PhoneCard } from "@/components/PhoneCard";
import { PHONES } from "@/data/phones";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "T-Phones — Find and Verify Original Phones" },
      {
        name: "description",
        content:
          "T-Phones helps you search original mobile phones and verify device authenticity with a 15-digit IMEI check.",
      },
      { property: "og:title", content: "T-Phones — Find and Verify Original Phones" },
      {
        property: "og:description",
        content: "Search genuine phones and verify any IMEI in seconds.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: ScanLine,
    title: "Enter the IMEI",
    body: "Dial *#06# or check Settings to get the 15-digit identifier for any handset.",
  },
  {
    icon: ShieldCheck,
    title: "We check the registry",
    body: "The number is matched against brand, model and warranty records instantly.",
  },
  {
    icon: BadgeCheck,
    title: "Buy with confidence",
    body: "Get a clear verdict — verified original, or a warning worth walking away from.",
  },
];

function Index() {
  return (
    <>
      <Hero />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">How T-Phones works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular phones */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-success" /> Popular right now
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Verified original phones
            </h2>
          </div>
          <Link
            to="/search"
            className="inline-flex h-10 items-center rounded-lg border border-input px-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHONES.slice(0, 6).map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* Verify CTA */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-hero px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            Buying second-hand? Check it first.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/70">
            One IMEI lookup tells you the brand, model and warranty status of the device in your
            hand.
          </p>
          <Link
            to="/verify"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-success px-6 text-sm font-semibold text-success-foreground transition-transform hover:scale-[1.02]"
          >
            <ShieldCheck className="size-4" /> Verify Authenticity
          </Link>
        </div>
      </section>
    </>
  );
}
