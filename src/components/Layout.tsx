import { Link } from "@tanstack/react-router";
import { ShieldCheck, Search, Home, Menu, X, ClipboardCheck } from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/verify", label: "Verify", icon: ShieldCheck },
  { to: "/inspect", label: "Inspect", icon: ClipboardCheck },
] as const;

/** Brand logo mark + wordmark, reused in the header and footer. */
function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
        <ShieldCheck className="size-4" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        True<span className="text-success">Phone</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          <Link
            to="/verify"
            className="ml-2 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Check IMEI
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Search original mobile phones and verify device authenticity before you buy.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Product</p>
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Good to know</p>
          <p className="text-muted-foreground">
            Verification results shown here are simulated demo data.
          </p>
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} TruePhone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Shared page shell: header, page content, footer. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
