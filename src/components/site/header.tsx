import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <Container>
        <div className="relative flex h-16 items-center justify-between gap-4 sm:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-pill px-4 py-2 font-display text-sm font-medium text-ink transition hover:bg-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              href={site.bookVisitHref}
              className="hidden min-h-10 px-5 py-2 text-sm sm:inline-flex"
            >
              Book a visit
            </Button>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
