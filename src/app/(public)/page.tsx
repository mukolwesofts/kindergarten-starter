import { Hero } from "@/components/site/hero";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Features } from "@/components/site/features";
import { Classes } from "@/components/site/classes";
import { DayTimeline } from "@/components/site/day-timeline";
import { Testimonials } from "@/components/site/testimonials";
import { Gallery } from "@/components/site/gallery";
import { CtaBanner } from "@/components/site/cta-banner";

export default function HomePage() {
    return (
        <>
            <Hero />
            <WaveDivider className="text-soft" />
            <div className="bg-soft">
                <Features />
            </div>
            <WaveDivider className="rotate-180 text-soft" />
            <Classes />
            <DayTimeline />
            <div className="bg-soft">
                <Testimonials />
            </div>
            <Gallery />
            <CtaBanner />
        </>
    );
}
