import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

/** Yellow circle crest with a star + school name. */
export function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            className={cn(
                "inline-flex items-center gap-2.5 rounded-pill",
                className,
            )}
            aria-label={`${site.name} — home`}
        >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent shadow-soft">
                <Star
                    aria-hidden="true"
                    className="size-5 fill-on-accent text-on-accent"
                />
            </span>
            <span className="font-display text-lg leading-tight font-semibold text-ink">
                {site.name}
            </span>
        </Link>
    );
}
