import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactRows = [
  { icon: MapPin, label: site.address, href: undefined },
  { icon: Phone, label: site.phone, href: `tel:${site.phoneHref}` },
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: site.hours, href: undefined },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-3 lg:col-span-2">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Contact details">
            <h2 className="font-display text-sm font-semibold tracking-widest text-brand uppercase">
              Visit or get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {contactRows.map((row) => (
                <li key={row.label}>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="inline-flex items-start gap-2.5 rounded text-sm text-ink hover:text-brand"
                    >
                      <row.icon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-brand"
                      />
                      {row.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-start gap-2.5 text-sm text-ink">
                      <row.icon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-brand"
                      />
                      {row.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h2 className="font-display text-sm font-semibold tracking-widest text-brand uppercase">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {site.footer.explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded text-sm text-ink hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-center text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
