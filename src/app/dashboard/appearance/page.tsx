import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { getAppearance } from "@/features/settings/queries";
import { AppearanceForm } from "@/features/settings/components/appearance-form";

export const metadata: Metadata = {
  title: "Appearance",
  robots: { index: false, follow: false },
};

export default async function AppearancePage() {
  const user = await requireUser();
  const isAdmin = can(user, "manage", "settings");
  const appearance = await getAppearance();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium sm:text-3xl">Appearance</h1>
        <p className="mt-1 text-sm text-muted">
          {isAdmin
            ? "Pick the brand colours and fonts — saved values apply site-wide."
            : "Read-only view — ask an admin to make changes."}
        </p>
      </div>
      {isAdmin ? (
        <AppearanceForm initial={appearance} />
      ) : (
        <dl className="grid max-w-md gap-3 rounded-card border border-line bg-surface-raised p-6 text-sm shadow-soft">
          <div className="flex justify-between">
            <dt className="text-muted">Brand colour</dt>
            <dd className="font-mono text-ink">{appearance.brand}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Accent colour</dt>
            <dd className="font-mono text-ink">{appearance.accent}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Font pair</dt>
            <dd className="text-ink">{appearance.fontPair}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
