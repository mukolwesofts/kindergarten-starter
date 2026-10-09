"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveAppearance } from "../actions";
import {
    FONT_PAIRS,
    type Appearance,
    type FontPairId,
} from "@/lib/appearance";
import { contrastRatio } from "@/lib/contrast";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const inputClasses =
    "min-h-11 rounded-xl border border-line bg-surface px-4 text-sm text-ink";

function ContrastCheck({
    label,
    fg,
    bg,
}: {
    label: string;
    fg: string;
    bg: string;
}) {
    const valid = /^#[0-9a-fA-F]{6}$/.test(fg) && /^#[0-9a-fA-F]{6}$/.test(bg);
    if (!valid) return null;
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= 4.5;
    return (
        <li className="flex items-center gap-2 text-sm">
            {pass ? (
                <CheckCircle2 aria-hidden="true" className="size-4 text-green-600" />
            ) : (
                <XCircle aria-hidden="true" className="size-4 text-red-600" />
            )}
            <span className="text-ink">{label}</span>
            <span className="ml-auto text-muted">
                {ratio.toFixed(1)}:1 {pass ? "— passes AA" : "— fails AA"}
            </span>
        </li>
    );
}

export function AppearanceForm({ initial }: { initial: Appearance }) {
    const [brand, setBrand] = useState(initial.brand);
    const [accent, setAccent] = useState(initial.accent);
    const [fontPair, setFontPair] = useState<FontPairId>(initial.fontPair);
    const [pending, startTransition] = useTransition();
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    function save() {
        startTransition(async () => {
            const result = await saveAppearance({ brand, accent, fontPair });
            if (result.ok) {
                toast.success("Appearance saved — the whole site now uses it.");
                setFieldErrors({});
            } else {
                setFieldErrors(result.fieldErrors ?? {});
                if (result.error) toast.error(result.error);
            }
        });
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-5 rounded-card border border-line bg-surface-raised p-6 shadow-soft">
                <h2 className="font-display text-lg font-medium">Colours</h2>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="brand"
                        className="font-display text-sm font-semibold text-ink"
                    >
                        Brand colour
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            id="brand"
                            type="color"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="h-11 w-16 cursor-pointer rounded-xl border border-line bg-surface p-1"
                        />
                        <input
                            aria-label="Brand colour hex value"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    {fieldErrors.brand && (
                        <p role="alert" className="text-sm text-brand">
                            {fieldErrors.brand}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="accent"
                        className="font-display text-sm font-semibold text-ink"
                    >
                        Accent colour (CTAs)
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            id="accent"
                            type="color"
                            value={accent}
                            onChange={(e) => setAccent(e.target.value)}
                            className="h-11 w-16 cursor-pointer rounded-xl border border-line bg-surface p-1"
                        />
                        <input
                            aria-label="Accent colour hex value"
                            value={accent}
                            onChange={(e) => setAccent(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    {fieldErrors.accent && (
                        <p role="alert" className="text-sm text-brand">
                            {fieldErrors.accent}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="fontPair"
                        className="font-display text-sm font-semibold text-ink"
                    >
                        Font pair
                    </label>
                    <select
                        id="fontPair"
                        value={fontPair}
                        onChange={(e) => setFontPair(e.target.value as FontPairId)}
                        className={inputClasses}
                    >
                        {FONT_PAIRS.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.fontPair && (
                        <p role="alert" className="text-sm text-brand">
                            {fieldErrors.fontPair}
                        </p>
                    )}
                </div>

                <Button
                    variant="accent"
                    onClick={save}
                    disabled={pending}
                    className="mt-2"
                >
                    {pending ? "Saving…" : "Save appearance"}
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="rounded-card border border-line bg-surface-raised p-6 shadow-soft">
                    <h2 className="font-display text-lg font-medium">Contrast check</h2>
                    <p className="mt-1 text-sm text-muted">
                        Live WCAG AA check (needs at least 4.5:1).
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                        <ContrastCheck
                            label="Brand text on white"
                            fg={brand}
                            bg="#ffffff"
                        />
                        <ContrastCheck
                            label="White text on brand banner"
                            fg="#ffffff"
                            bg={brand}
                        />
                        <ContrastCheck
                            label="Dark text on accent (CTAs)"
                            fg="#2b1b3d"
                            bg={accent}
                        />
                    </ul>
                </div>

                <div className="rounded-card border border-line bg-surface-raised p-6 shadow-soft">
                    <h2 className="font-display text-lg font-medium">Preview</h2>
                    <div
                        className="mt-4 rounded-card border border-line p-5"
                        style={{
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <p
                            className="font-display text-xl"
                            style={{
                                color: brand,
                                fontFamily:
                                    FONT_PAIRS.find((p) => p.id === fontPair)?.display,
                            }}
                        >
                            Little steps. Big discoveries.
                        </p>
                        <p
                            className="mt-1 text-sm"
                            style={{
                                color: "#2b1b3d",
                                fontFamily: FONT_PAIRS.find((p) => p.id === fontPair)?.body,
                            }}
                        >
                            A warm, playful kindergarten where children feel safe.
                        </p>
                        <span
                            className="mt-4 inline-block rounded-pill px-5 py-2.5 font-display text-sm font-semibold"
                            style={{
                                backgroundColor: accent,
                                color: "#2b1b3d",
                                fontFamily:
                                    FONT_PAIRS.find((p) => p.id === fontPair)?.display,
                            }}
                        >
                            Book a visit
                        </span>
                    </div>
                    <p className="mt-3 text-xs text-muted">
                        For a full re-theme (every token, dark mode), edit{" "}
                        <code className="text-brand">src/styles/theme.css</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}
