import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { listUsers } from "@/features/users/queries";
import { UsersManager } from "@/features/users/components/users-manager";

export const metadata: Metadata = {
  title: "Users",
  robots: { index: false, follow: false },
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser();
  const { q } = await searchParams;
  const users = await listUsers(q);
  const isAdmin = can(user, "manage", "user");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium sm:text-3xl">Users</h1>
        <p className="mt-1 text-sm text-muted">
          {isAdmin
            ? "Everyone who can sign in to this dashboard."
            : "Read-only view — ask an admin to make changes."}
        </p>
      </div>

      <UsersManager
        users={users}
        currentUserId={user.id}
        isAdmin={isAdmin}
        search={q ?? ""}
      />
    </div>
  );
}
