import { dayWithUs } from "@/content/home";
import { Section } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { PlaceholderNote } from "@/components/ui/placeholder-note";

export function DayTimeline() {
  return (
    <Section
      id="a-day-with-us"
      eyebrow={dayWithUs.eyebrow}
      title={dayWithUs.title}
      intro={dayWithUs.intro}
    >
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <ol className="relative flex flex-col gap-6 border-l-2 border-line pl-6">
          {dayWithUs.timeline.map((slot) => (
            <li key={slot.time} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[31px] size-3 rounded-full bg-accent ring-4 ring-surface"
              />
              <p className="font-display text-xs font-semibold tracking-widest text-brand uppercase">
                {slot.time}
              </p>
              <h3 className="mt-0.5 text-lg font-medium">{slot.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{slot.text}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-4">
          <PhotoPlaceholder
            shape="rounded"
            label={dayWithUs.photoLabel}
            className="sticky top-24 aspect-square md:aspect-[4/5]"
          />
          <PlaceholderNote>{dayWithUs.note}</PlaceholderNote>
        </div>
      </div>
    </Section>
  );
}
