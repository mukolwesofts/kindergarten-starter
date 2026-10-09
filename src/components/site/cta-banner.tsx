import { closingCta } from "@/content/home";
import { whatsappUrl } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function CtaBanner() {
    return (
        <Section id="contact" className="bg-brand py-section-sm sm:py-section">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-medium text-surface sm:text-4xl">
                    {closingCta.title}
                </h2>
                <p className="text-base leading-relaxed text-surface/85 sm:text-lg">
                    {closingCta.intro}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button variant="accent" href={closingCta.primaryCta.href}>
                        {closingCta.primaryCta.label}
                    </Button>
                    <Button
                        variant="outline"
                        href={closingCta.secondaryCta.href}
                        className="border-surface/40 text-surface hover:border-surface"
                    >
                        {closingCta.secondaryCta.label}
                    </Button>
                </div>
                <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill text-sm text-surface/85 underline decoration-accent underline-offset-4 hover:text-surface"
                >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    or message us on WhatsApp
                </a>
            </div>
        </Section>
    );
}
