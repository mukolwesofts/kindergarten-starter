import { testimonials } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PlaceholderNote } from "@/components/ui/placeholder-note";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <Section
      id="parents"
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <li key={i}>
            <Card className="flex h-full flex-col gap-4">
              <Quote
                aria-hidden="true"
                className="size-7 fill-accent text-accent"
              />
              <blockquote className="text-sm leading-relaxed text-ink">
                {item.quote}
              </blockquote>
              <footer className="mt-auto">
                <p className="font-display text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted">{item.detail}</p>
              </footer>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center">
        <PlaceholderNote>{testimonials.note}</PlaceholderNote>
      </p>
    </Section>
  );
}
