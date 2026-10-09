import { classes } from "@/content/home";
import { site } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderNote } from "@/components/ui/placeholder-note";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Classes() {
  return (
    <Section
      id="classes"
      eyebrow={classes.eyebrow}
      title={classes.title}
      intro={classes.intro}
    >
      <ul className="grid gap-6 sm:grid-cols-3">
        {classes.items.map((item) => (
          <li key={item.name}>
            <Card
              className={cn(
                "flex h-full flex-col gap-4 transition hover:shadow-lift",
                item.tilted && "bg-soft md:-rotate-2",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{item.name}</h3>
                <Badge>{item.ages}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted">{item.blurb}</p>
              <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
                <p className="text-sm text-muted">
                  From <span className="font-semibold text-ink">{item.fee}</span>{" "}
                  / term
                </p>
                <Button
                  variant="outline"
                  href={site.bookVisitHref}
                  className="min-h-10 px-4 py-2 text-sm"
                >
                  Book a visit
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center">
        <PlaceholderNote>{classes.note}</PlaceholderNote>
      </p>
    </Section>
  );
}
