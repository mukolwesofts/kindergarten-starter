import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

export function Section({
    id,
    eyebrow,
    title,
    intro,
    children,
    className,
    headerClassName,
}: {
    id?: string;
    eyebrow?: string;
    title?: string;
    intro?: string;
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
}) {
    return (
        <section
            id={id}
            className={cn("scroll-mt-20 py-section-sm sm:scroll-mt-24 sm:py-section", className)}
        >
            <Container>
                {(eyebrow || title || intro) && (
                    <div
                        className={cn(
                            "mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center sm:mb-14",
                            headerClassName,
                        )}
                    >
                        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                        {title && (
                            <h2 className="text-3xl font-medium sm:text-4xl">{title}</h2>
                        )}
                        {intro && (
                            <p className="text-base leading-relaxed text-muted sm:text-lg">
                                {intro}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </Container>
        </section>
    );
}
