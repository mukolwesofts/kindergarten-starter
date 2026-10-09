import { gallery } from "@/content/home";
import { Section } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <Section
      eyebrow={gallery.eyebrow}
      title={gallery.title}
      intro={gallery.intro}
    >
      <ul className="grid items-center gap-6 sm:grid-cols-3">
        {gallery.slots.map((slot) => (
          <li key={slot.label}>
            <PhotoPlaceholder
              shape={slot.shape}
              label={slot.label}
              className={cn(slot.shape === "arch" && "aspect-[3/4]")}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
