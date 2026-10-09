import {
  HeartHandshake,
  ShieldCheck,
  UtensilsCrossed,
  BellRing,
  type LucideIcon,
} from "lucide-react";

/**
 * Copy and data for every section of the home page.
 * Keeping it in one file means it can later move into the
 * database without touching a single component.
 */

export const hero = {
  eyebrow: "A happy start in Kiambu",
  title: "Little steps. Big discoveries.",
  intro:
    "A warm, playful kindergarten where children feel safe, make friends and fall in love with learning — one small discovery at a time.",
  primaryCta: { label: "Book a visit", href: "/#contact" },
  secondaryCta: { label: "See our classes", href: "/#classes" },
  footnote: "Daycare, playgroup, PP1 and PP2",
  photoLabel: "A happy classroom moment",
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  note?: string;
};

export const features: { eyebrow: string; title: string; items: Feature[] } = {
  eyebrow: "Why us",
  title: "Why families feel at home",
  items: [
    {
      icon: HeartHandshake,
      title: "Caring teachers",
      text: "Patient, qualified teachers who know every child by name — and by heart.",
      note: "Confirm staffing details before publishing.",
    },
    {
      icon: ShieldCheck,
      title: "A safe space",
      text: "A secure, child-proofed compound with supervised play all day.",
      note: "Confirm safety wording before publishing.",
    },
    {
      icon: UtensilsCrossed,
      title: "Healthy meals",
      text: "Fresh, balanced meals and snacks prepared on site each day.",
      note: "Confirm meal plan details before publishing.",
    },
    {
      icon: BellRing,
      title: "Updates for parents",
      text: "Regular photos and updates, so you never miss a little moment.",
      note: "Confirm how updates are shared before publishing.",
    },
  ],
};

export const classes = {
  eyebrow: "Classes",
  title: "Find their next little step",
  intro:
    "Small classes, gentle routines and learning through play — matched to where your child is right now.",
  items: [
    {
      name: "Playgroup",
      ages: "2 – 3 years",
      blurb:
        "First friends, first routines. Sensory play, songs and lots of cuddles in a calm, happy room.",
      fee: "KES 00,000 (sample)",
      tilted: false,
    },
    {
      name: "PP1",
      ages: "4 years",
      blurb:
        "Curiosity in full swing. Early phonics, counting games and creative projects every day.",
      fee: "KES 00,000 (sample)",
      tilted: true,
    },
    {
      name: "PP2",
      ages: "5 – 6 years",
      blurb:
        "Getting ready for big school. Confidence with letters, numbers and doing things all by myself.",
      fee: "KES 00,000 (sample)",
      tilted: false,
    },
  ],
  note: "Daycare is available for younger children. Fees shown are samples - contact the school for the current fee structure.",
};

export const dayWithUs = {
  eyebrow: "A day with us",
  title: "A gentle rhythm they can count on",
  intro: "Predictable days help little people feel brave enough to explore.",
  photoLabel: "A moment from the school day",
  timeline: [
    {
      time: "7:30",
      title: "Arrival & free play",
      text: "Warm hellos at the gate, then settling in with favourite toys.",
    },
    {
      time: "8:30",
      title: "Circle time",
      text: "Songs, news of the day and a story to gather everyone together.",
    },
    {
      time: "9:30",
      title: "Snack & outdoor play",
      text: "Fruit, water and running, climbing and digging in the garden.",
    },
    {
      time: "10:30",
      title: "Learning through play",
      text: "Letters, numbers and little projects — hands busy, minds buzzing.",
    },
    {
      time: "12:30",
      title: "Lunch & tidy-up",
      text: "A hot meal together, then everyone helps put things away.",
    },
    {
      time: "1:30",
      title: "Rest, stories & pick-up",
      text: "Quiet time, a last story, and happy reunions at the gate.",
    },
  ],
  note: "Sample timetable — confirm the real daily schedule before publishing.",
};

export const testimonials = {
  eyebrow: "Parents",
  title: "Kind words matter",
  items: [
    {
      quote:
        "Placeholder quote — a short, warm sentence from a parent about how their child settled in.",
      name: "Parent name",
      detail: "Playgroup parent (placeholder)",
    },
    {
      quote:
        "Placeholder quote — something about the teachers, the updates or how much their child has grown.",
      name: "Parent name",
      detail: "PP1 parent (placeholder)",
    },
    {
      quote:
        "Placeholder quote — a line about a child who now runs to the gate every morning.",
      name: "Parent name",
      detail: "PP2 parent (placeholder)",
    },
  ],
  note: "Replace all placeholder quotes with real, consented parent reviews before launch.",
};

export const gallery = {
  eyebrow: "Gallery",
  title: "Little moments, every day",
  intro: "A peek at the everyday magic — swap these placeholders for real photos.",
  slots: [
    { shape: "rounded" as const, label: "Playground fun" },
    { shape: "arch" as const, label: "Art time" },
    { shape: "rounded" as const, label: "Story corner" },
    { shape: "arch" as const, label: "Snack time" },
    { shape: "rounded" as const, label: "Music & movement" },
    { shape: "arch" as const, label: "Outdoor adventures" },
  ],
  socialsIntro: "Every little moment lives on our socials - come see the full gallery.",
};

export const closingCta = {
  title: "Could this be their happy place?",
  intro:
    "The best way to know is to come and see. Bring your little one, meet the teachers and feel the place for yourselves.",
  primaryCta: { label: "Ask about a visit", href: "/#contact" },
  secondaryCta: { label: "Contact the school", href: "/#contact" },
};
