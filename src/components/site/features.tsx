import { features } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { PlaceholderNote } from "@/components/ui/placeholder-note";

export function Features() {
  return (
    <Section eyebrow={features.eyebrow} title={features.title}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.items.map((item) => (
          <li key={item.title}>
            <Card className="flex h-full flex-col gap-4">
              <IconTile icon={item.icon} />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.text}</p>
                {item.note && <PlaceholderNote>{item.note}</PlaceholderNote>}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
