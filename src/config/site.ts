/**
 * Site-wide configuration for St. Michaels Kindergarten.
 * Every school detail used anywhere on the site lives here —
 * components never hard-code names, numbers or links.
 */

export const site = {
  name: "St. Michaels Kindergarten",
  shortName: "St. Michaels",
  tagline: "A happy start for little learners.",
  description:
    "A warm, playful kindergarten in Kiambu, Kenya — daycare, playgroup, PP1 and PP2. Little steps, big discoveries.",

  // Replace with the school's real details before launch.
  address: "Kiambu Town, Kiambu County, Kenya",
  phone: "+254 700 000 000",
  phoneHref: "+254700000000",
  email: "hello@stmichaels.example",
  whatsappNumber: "254700000000",
  whatsappMessage: "Hello, I'd like to ask about a visit.",
  hours: "Mon – Fri, 7:30am – 4:00pm",

  nav: [
    { label: "Classes", href: "/#classes" },
    { label: "A day with us", href: "/#a-day-with-us" },
    { label: "Parents", href: "/#parents" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ],

  // Replace with the school's real social profiles before launch.
  socials: [
    { label: "Instagram", href: "https://instagram.com/stmichaelskindergarten" },
    { label: "TikTok", href: "https://tiktok.com/@stmichaelskindergarten" },
    { label: "Facebook", href: "https://facebook.com/stmichaelskindergarten" },
  ],

  bookVisitHref: "/#contact",

  footer: {
    explore: [
      { label: "Classes", href: "/#classes" },
      { label: "A day with us", href: "/#a-day-with-us" },
      { label: "Parents", href: "/#parents" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Contact", href: "/#contact" },
    ],
  },
} as const;

export function whatsappUrl(message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return new URL(path, base).toString();
}

export const showPlaceholderNotes =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTES === "true";
