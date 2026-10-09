import { hero } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { BlobFrame } from "@/components/ui/blob-frame";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Sparkles, Star } from "lucide-react";

export function Hero() {
    return (
        <section className="overflow-hidden pt-10 pb-4 sm:pt-16">
            <Container>
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                    <div className="flex flex-col items-start gap-5">
                        <Eyebrow>{hero.eyebrow}</Eyebrow>
                        <h1 className="text-4xl font-medium text-brand sm:text-5xl lg:text-6xl">
                            {hero.title}
                        </h1>
                        <p className="max-w-md text-lg leading-relaxed text-muted">
                            {hero.intro}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <Button variant="accent" href={hero.primaryCta.href}>
                                {hero.primaryCta.label}
                            </Button>
                            <Button variant="outline" href={hero.secondaryCta.href}>
                                {hero.secondaryCta.label}
                            </Button>
                        </div>
                        <p className="text-sm text-muted">{hero.footnote}</p>
                    </div>

                    <div className="relative">
                        <BlobFrame>
                            <PhotoPlaceholder shape="blob" label={hero.photoLabel} />
                        </BlobFrame>
                        <Sparkles
                            aria-hidden="true"
                            className="absolute -top-4 right-6 size-8 animate-float text-accent"
                        />
                        <Star
                            aria-hidden="true"
                            className="absolute bottom-6 -left-3 size-6 fill-accent text-accent"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
