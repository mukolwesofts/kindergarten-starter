import type { Metadata } from "next";
import { Fredoka, Nunito, Baloo_2, Quicksand } from "next/font/google";
import type { CSSProperties } from "react";
import { site, absoluteUrl } from "@/config/site";
import { getAppearance } from "@/features/settings/queries";
import { fontPairById } from "@/lib/appearance";
import "./globals.css";

const fredoka = Fredoka({
    subsets: ["latin"],
    variable: "--font-fredoka",
    display: "swap",
});

const baloo2 = Baloo_2({
    subsets: ["latin"],
    variable: "--font-baloo2",
    display: "swap",
});

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
    display: "swap",
});

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(absoluteUrl()),
    title: {
        default: `${site.name} — ${site.tagline}`,
        template: `%s — ${site.shortName}`,
    },
    description: site.description,
    openGraph: {
        type: "website",
        siteName: site.name,
        title: `${site.name} — ${site.tagline}`,
        description: site.description,
        locale: "en_KE",
    },
    robots: { index: true, follow: true },
};

function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Preschool",
        name: site.name,
        description: site.description,
        url: absoluteUrl(),
        telephone: site.phone,
        email: site.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: site.address,
            addressCountry: "KE",
        },
        openingHours: site.hours,
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

/**
 * Saved appearance (Dashboard → Appearance) overrides the theme.css
 * defaults by setting the same CSS variables on <html>.
 */
function themeOverrides(a: {
    brand: string;
    accent: string;
    fontPair: Parameters<typeof fontPairById>[0];
}): CSSProperties {
    const pair = fontPairById(a.fontPair);
    const vars: Record<string, string> = {
        "--color-brand": a.brand,
        "--color-accent": a.accent,
        "--font-display": pair.display,
        "--font-body": pair.body,
    };
    return vars as CSSProperties;
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const appearance = await getAppearance();

    return (
        <html
            lang="en"
            className={`${fredoka.variable} ${baloo2.variable} ${nunito.variable} ${quicksand.variable}`}
            style={themeOverrides(appearance)}
            suppressHydrationWarning
        >
            <body className="min-h-screen font-body">
                <JsonLd />
                {children}
            </body>
        </html>
    );
}
