/**
 * All copy for the demo chatbot lives here.
 * Rules: fees and dates must stay sample wording, never invent real
 * figures, and replies must never ask for personal details about
 * children.
 */
export const chatbot = {
  welcome:
    "Hello! I'm the little demo helper for St. Michaels. Ask me about fees, classes or visiting — or pick a topic below.",
  chips: [
    "Fees",
    "Class schedule",
    "Classes and ages",
    "How to apply",
    "Book a visit",
  ],
  footerNote:
    "This is a demo assistant. For anything else, message us on WhatsApp.",

  /** keyword → reply, checked in order */
  replies: [
    {
      keywords: ["fee", "fees", "cost", "price", "pay", "ksh", "kes"],
      reply:
        "Fees depend on the class your child joins — the figures on this page are samples only. For the current fee structure, message us on WhatsApp and we'll send it right over.",
    },
    {
      keywords: ["schedule", "timetable", "day", "time", "hours", "open"],
      reply:
        "A typical day runs from drop-off in the morning through meals, play and rest — see the 'A day with us' section for the sample timetable. WhatsApp us for exact timings.",
    },
    {
      keywords: ["class", "age", "playgroup", "pp1", "pp2", "daycare", "grade"],
      reply:
        "We offer daycare, Playgroup (ages 2–3), PP1 (age 4) and PP2 (ages 5–6). Each class page card shows the age band — and a visit is the best way to find the right fit.",
    },
    {
      keywords: ["apply", "admission", "enrol", "register", "join", "intake"],
      reply:
        "Applying is simple: book a visit, meet the teachers, and we'll walk you through enrolment. There's no paperwork to fill in first — just come say hello.",
    },
    {
      keywords: ["visit", "tour", "book", "appointment", "come", "see"],
      reply:
        "We'd love to show you around! Tap 'Book a visit' at the top of the page, or message us on WhatsApp and we'll find a day that suits you.",
    },
  ],

  fallback:
    "I'm only a little demo helper, so I might not have that answer. The team can help on WhatsApp — tap the green button at the bottom left to chat with a real person.",
} as const;
