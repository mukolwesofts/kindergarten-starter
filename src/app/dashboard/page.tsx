import { requireUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { userStats } from "@/features/users/queries";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, Clock, ArrowRight } from "lucide-react";

function formatWhen(ts: number | null) {
  if (!ts) return "Never";
  return new Date(ts * 1000).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function DashboardPage() {
  const user = await requireUser();
  const stats = await userStats();
  const isAdmin = can(user, "manage", "user");

  const cards = [
    { icon: Users, label: "Total users", value: String(stats.total) },
    { icon: UserCheck, label: "Active users", value: String(stats.active) },
    {
      icon: Clock,
      label: "Last login",
      value: formatWhen(stats.lastLoginAt),
      small: true,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-medium sm:text-3xl">
          Jambo, {user.name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s the little control room for the website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-soft text-brand">
              <card.icon aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-xs text-muted">{card.label}</p>
              <p
                className={
                  card.small
                    ? "font-display text-sm font-semibold"
                    : "font-display text-2xl font-semibold"
                }
              >
                {card.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-medium">Quick links</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <a
            href="/dashboard/users"
            className="group flex items-center justify-between rounded-card border border-line bg-surface-raised p-5 shadow-soft transition hover:shadow-lift"
          >
            <div>
              <p className="font-display font-medium">Manage users</p>
              <p className="mt-0.5 text-sm text-muted">
                {isAdmin
                  ? "Add, edit or remove dashboard accounts."
                  : "View dashboard accounts (admin only)."}
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="size-5 text-brand transition group-hover:translate-x-1"
            />
          </a>
          <a
            href="/dashboard/appearance"
            className="group flex items-center justify-between rounded-card border border-line bg-surface-raised p-5 shadow-soft transition hover:shadow-lift"
          >
            <div>
              <p className="font-display font-medium">Appearance</p>
              <p className="mt-0.5 text-sm text-muted">
                Tune the site colours and fonts.
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="size-5 text-brand transition group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
