import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PhoneCard } from "@/components/PhoneCard";
import { BRANDS, OPERATING_SYSTEMS, PHONES } from "@/data/phones";

type SearchParams = { q?: string | undefined };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const raw = search["q"];
    return typeof raw === "string" && raw ? { q: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "Search Original Phones — TruePhone Catalog" },
      {
        name: "description",
        content:
          "Browse verified original smartphones from Apple, Samsung, Google and more. Filter by brand, price range and operating system.",
      },
      { property: "og:title", content: "Search Original Phones — TruePhone Catalog" },
      {
        property: "og:description",
        content: "Filter verified original phones by brand, price and OS.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const navigate = useNavigate();
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [brands, setBrands] = useState<string[]>([]);
  const [systems, setSystems] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2100000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PHONES.filter(
      (p) =>
        (!term || `${p.brand} ${p.name}`.toLowerCase().includes(term)) &&
        (brands.length === 0 || brands.includes(p.brand)) &&
        (systems.length === 0 || systems.includes(p.os)) &&
        p.price <= maxPrice,
    );
  }, [query, brands, systems, maxPrice]);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const clearAll = () => {
    setBrands([]);
    setSystems([]);
    setMaxPrice(2100000);
    setQuery("");
    navigate({ to: "/search", search: {} });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Phone catalog</h1>
        <p className="text-sm text-muted-foreground">
          {results.length} verified original {results.length === 1 ? "device" : "devices"} available.
        </p>
      </header>

      {/* Search bar */}
      <div className="mt-6 flex gap-2">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 transition-colors focus-within:border-primary">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand or model…"
            aria-label="Search catalog"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-input bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filter sidebar */}
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">Filters</p>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>

            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                Brand
              </legend>
              {BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => setBrands((list) => toggle(list, brand))}
                    className="size-4 accent-primary"
                  />
                  {brand}
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                Max price: ₦{maxPrice.toLocaleString()}
              </legend>
              <input
                type="range"
                min={500000}
                max={2100000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Maximum price"
              />
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                Operating system
              </legend>
              {OPERATING_SYSTEMS.map((os) => (
                <label
                  key={os}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={systems.includes(os)}
                    onChange={() => setSystems((list) => toggle(list, os))}
                    className="size-4 accent-primary"
                  />
                  {os}
                </label>
              ))}
            </fieldset>
          </div>
        </aside>

        {/* Results grid */}
        <section>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="font-semibold text-foreground">No phones match those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the price range or clearing brand filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
