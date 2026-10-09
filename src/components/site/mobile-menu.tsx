"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line text-ink"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-soft"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1 px-4 py-4">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-display text-base font-medium text-ink hover:bg-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  variant="accent"
                  href={site.bookVisitHref}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a visit
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
