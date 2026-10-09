# St. Michaels Kindergarten

A playful, minimal kindergarten site (Kiambu, Kenya) plus a small admin
dashboard. Built with Next.js (App Router, RSC, Server Actions), Tailwind CSS
v4, Turso (libSQL) + Drizzle ORM, and Auth.js v5 credentials auth.

## Quick start

```bash
pnpm install
cp .env.example .env        # then fill in the values
pnpm db:push                # create tables
pnpm db:seed                # create the first admin user
pnpm dev                    # http://localhost:3000
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `TURSO_DATABASE_URL` | `libsql://...` for Turso, or `file:local.db` for local SQLite |
| `TURSO_AUTH_TOKEN` | Turso auth token (leave empty for `file:` URLs) |
| `AUTH_SECRET` | Auth.js session secret — `openssl rand -base64 32` |
| `SEED_ADMIN_EMAIL` | Email for the first admin (used by `pnpm db:seed`) |
| `SEED_ADMIN_PASSWORD` | Password for the first admin |
| `NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTES` | `true` to show "confirm before publishing" helper notes next to placeholder copy |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD |

## Turso setup

```bash
# one-time
brew install tursodatabase/tap/turso   # or see https://docs.turso.tech
turso auth signup && turso auth login

# create the database + token
turso db create st-michaels
turso db show st-michaels --url        # → TURSO_DATABASE_URL
turso db tokens create st-michaels     # → TURSO_AUTH_TOKEN
```

Without Turso, `TURSO_DATABASE_URL=file:local.db` gives you a local SQLite
file — perfect for development.

## Migrations

- `pnpm db:generate` — turn schema changes (`src/features/*/schema.ts`) into
  SQL files under `drizzle/`
- `pnpm db:push` — apply the current schema directly (great for dev)
- `pnpm drizzle-kit migrate` — apply generated migration files (use this in
  production/CI)
- `pnpm db:seed` — create the first admin; safe to run twice

## Deploy to Vercel

1. Push the repo to GitHub/GitLab and import it into Vercel.
2. Add all env vars (`TURSO_*`, `AUTH_SECRET`, `SEED_ADMIN_*`,
   `NEXT_PUBLIC_SITE_URL`) in Project → Settings → Environment Variables.
3. Deploy, then run `pnpm db:push` + `pnpm db:seed` against the Turso
   database (from your machine, or a CI step).

## Re-theming the site

Everything visual is centralised:

- **`src/styles/theme.css`** — all design tokens in Tailwind's `@theme`
  block (colours, fonts, radii, shadows, spacing) plus the
  `[data-theme="dark"]` and `prefers-color-scheme` variants. Components only
  use semantic utilities (`bg-brand`, `text-on-accent`, `border-line`,
  `font-display`, …) — no raw hex. Change a value here → whole site changes.
- **`src/config/site.ts`** — school name, tagline, address, phone, email,
  WhatsApp number/message, opening hours, nav and footer links.
- **`src/content/home.ts`** — all copy for every home section.
- **`src/content/chatbot.ts`** — the demo assistant's script.
- **Dashboard → Appearance** — admins can pick brand/accent colours (with a
  live WCAG contrast check) and a font pair; saved values are injected as CSS
  variables on `<html>` and fall back to `theme.css` defaults.

## How to add a new resource (worked example: Gallery)

The codebase is feature-based so new resources are copy-paste:

1. **Schema** — `src/features/gallery/schema.ts`:
   ```ts
   export const galleryItems = sqliteTable("gallery_items", {
     id: integer("id").primaryKey({ autoIncrement: true }),
     title: text("title").notNull(),
     imageUrl: text("image_url").notNull(),
     createdAt: integer("created_at").notNull(),
   });
   ```
   Then `pnpm db:generate` and `pnpm db:push`.

2. **Validators** — `src/lib/validators/gallery.ts`: zod schemas for
   create/update.

3. **Queries** — `src/features/gallery/queries.ts`: `listGalleryItems()`,
   `getGalleryItem(id)`. Start the file with `import "server-only"`.

4. **Actions** — `src/features/gallery/actions.ts`: server actions that all
   begin with `await getSessionUser()` + `can(user, "manage", "gallery")`,
   validate with zod, mutate, then `revalidatePath`. Extend `Resource` in
   `src/lib/permissions.ts` with `"gallery"` and decide which roles may
   write (the default matrix already gives admins everything, editors
   read-only).

5. **Page + components** — `src/app/dashboard/gallery/page.tsx` renders a
   server component that calls `requireUser()`, checks `can(...)`, and hands
   data to client components in `src/features/gallery/components/`
   (copy `users-manager.tsx` as a starting point for table + dialogs).

6. **Nav** — move "Gallery" from the `comingSoon` list into `navItems` in
   `src/components/dashboard/dashboard-shell.tsx` with its `href`.

## Project layout

```
src/
  app/            # routes: (public)/, login/, dashboard/, api/auth/, sitemap, robots
  components/
    ui/           # Button, Section, Eyebrow, Badge, Card, WaveDivider,
                  #   BlobFrame, PhotoPlaceholder, IconTile, Container, Dialog
    site/         # header, hero, sections, footer (public site)
    dashboard/    # shell: sidebar + top bar
    widgets/      # WhatsAppButton, ChatbotWidget, ChatPanel, ChatMessage, QuickReplies
  config/site.ts  # all school details
  content/        # home page copy, chatbot script
  features/       # users, settings, auth — {schema,queries,actions,components}
  lib/            # db, auth, permissions, validators, chatbot, contrast, utils
  styles/theme.css# all design tokens
scripts/seed.ts   # first-admin seeder
drizzle.config.ts # dialect switches sqlite↔turso based on the URL
```

## Testing checklist

Verified in this session:

- [x] `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass
- [x] Home page renders all 9 sections; static (○) in build output
- [x] `/login` renders; wrong-credentials path returns an inline error
- [x] Credentials sign-in sets `authjs.session-token`; `/dashboard` works when
  authed and 307-redirects to `/login?callbackUrl=…` when not
- [x] `pnpm db:push` + `pnpm db:seed`; seed is idempotent (run twice = no dup)
- [x] Appearance override: a saved `settings` row is injected as CSS vars on
  `<html>`; `saveAppearance` revalidates the tag + layout
- [x] `robots.txt` disallows `/dashboard`, `/login`, `/api`; sitemap serves

Stubbed / demo-only (by design):

- Chatbot is scripted — `src/lib/chatbot.ts#getReply` is the single seam to
  swap for a real backend/LLM. No network calls, no data stored.
- All photos are labelled placeholders (`PhotoPlaceholder`); testimonial
  quotes are explicit placeholders; fees show `KES 00,000 (sample)`.
- Sidebar items Gallery / Services / About / Visit requests render disabled
  with a "Coming soon" label.
- Rate limiting stores attempts per email in `login_attempts`; the `TODO` in
  `src/features/auth/rate-limit.ts` notes where to add per-IP identifiers.

Left for next time:

- Real photos + `next/image`, real fees/reviews/staff data
- Contact/visit-request form + the disabled dashboard sections
- Automated tests (Playwright/Vitest) and Lighthouse CI run
