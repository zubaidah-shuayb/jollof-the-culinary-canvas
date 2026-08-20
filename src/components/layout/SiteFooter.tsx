import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-16">
      <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-display text-4xl">{siteConfig.siteTitle}</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            An independent digital experiment by{" "}
            <a
              href={siteConfig.creatorWebsite}
              target="_blank"
              rel="noreferrer author"
              className="signature-name text-foreground"
            >
              {siteConfig.creatorName}
            </a>
            .
          </p>
        </div>

        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-8 gap-y-3">
          {siteConfig.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-label text-muted-foreground transition-colors hover:text-flame"
            >
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.creatorEmail}`}
            className="text-label text-muted-foreground transition-colors hover:text-flame"
          >
            Email
          </a>
        </nav>
      </div>

      <p className="shell mt-14 text-label text-muted-foreground">
        © {siteConfig.year} {siteConfig.creatorName}
      </p>
    </footer>
  );
}
