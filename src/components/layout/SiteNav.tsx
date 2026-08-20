import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="shell flex items-center justify-between py-6">
        <Link
          to="/"
          className="text-display text-xl tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {siteConfig.siteTitle}
        </Link>

        <nav className="hidden gap-10 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-label text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-label text-flame" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-label text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open ? (
        <div className="bg-background/95 backdrop-blur-sm md:hidden">
          <div className="shell flex flex-col gap-6 border-t border-border py-10">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-display text-4xl text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
