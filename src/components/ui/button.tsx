import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "outline";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-3 " +
  "font-display text-base font-medium tracking-wide transition " +
  "hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-surface shadow-soft",
  accent: "bg-accent text-on-accent shadow-soft",
  outline: "border-2 border-line bg-transparent text-ink hover:border-brand",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };
type AnchorProps = ComponentProps<"a"> & { variant?: Variant; href: string };

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", className, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorProps)} className={classes} />;
  }
  return <button {...(rest as ButtonProps)} className={classes} />;
}
