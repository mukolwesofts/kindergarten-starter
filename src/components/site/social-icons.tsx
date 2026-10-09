/**
 * Brand icons as inline SVG (lucide-react no longer ships brand marks).
 * Follow currentColor so they pick up the theme like lucide icons.
 */

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.9V2.5h-3.45v13.02a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.11V9.6a6.04 6.04 0 1 0 5.32 5.95V8.56a7.6 7.6 0 0 0 4.36 1.32V7.44a4.28 4.28 0 0 1-3.36-1.62z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 2.5h-3a5 5 0 0 0-5 5v3H7v4h3v7h4v-7h3l1-4h-4V7.5a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
