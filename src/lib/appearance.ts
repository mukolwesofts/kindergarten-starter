import { z } from "zod";

export const FONT_PAIRS = [
  {
    id: "fredoka-nunito",
    label: "Fredoka + Nunito (default)",
    display: "var(--font-fredoka), ui-rounded, sans-serif",
    body: "var(--font-nunito), ui-rounded, system-ui, sans-serif",
  },
  {
    id: "baloo2-nunito",
    label: "Baloo 2 + Nunito",
    display: "var(--font-baloo2), ui-rounded, sans-serif",
    body: "var(--font-nunito), ui-rounded, system-ui, sans-serif",
  },
  {
    id: "fredoka-quicksand",
    label: "Fredoka + Quicksand",
    display: "var(--font-fredoka), ui-rounded, sans-serif",
    body: "var(--font-quicksand), ui-rounded, system-ui, sans-serif",
  },
] as const;

export type FontPairId = (typeof FONT_PAIRS)[number]["id"];

const hexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex colour like #1d4ed8.");

export const appearanceSchema = z.object({
  brand: hexColor,
  accent: hexColor,
  fontPair: z.enum(FONT_PAIRS.map((p) => p.id) as [FontPairId, ...FontPairId[]]),
});

export type Appearance = z.infer<typeof appearanceSchema>;

/** Defaults mirror theme.css — used when nothing is saved yet. */
export const defaultAppearance: Appearance = {
  brand: "#5b2a86",
  accent: "#ffd23f",
  fontPair: "fredoka-nunito",
};

export function fontPairById(id: FontPairId) {
  return FONT_PAIRS.find((p) => p.id === id) ?? FONT_PAIRS[0];
}
