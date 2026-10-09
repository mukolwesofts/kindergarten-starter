import { gallery } from "@/content/home";
import { site } from "@/config/site";
import { Section } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { InstagramIcon, TikTokIcon, FacebookIcon } from "./social-icons";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Instagram: InstagramIcon,
    TikTok: TikTokIcon,
    Facebook: FacebookIcon,
};

export function Gallery() {
    return (
        <Section
            id="gallery"
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            intro={gallery.intro}
        >
            <ul className="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            <div className="mt-12 flex flex-col items-center gap-5">
                <p className="text-center text-sm text-muted">{gallery.socialsIntro}</p>
                <ul className="flex flex-wrap items-center justify-center gap-3">
                    {site.socials.map((social) => {
                        const Icon = socialIcons[social.label];
                        return (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center gap-2.5 rounded-pill border-2 border-line bg-surface px-5 py-2.5 font-display text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    {Icon && <Icon className="size-5 text-brand" />}
                                    {social.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}
