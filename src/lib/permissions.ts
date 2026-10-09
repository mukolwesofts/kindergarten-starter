import type { UserRole } from "@/features/users/schema";

export type Action = "create" | "read" | "update" | "delete" | "manage";
export type Resource =
  | "user"
  | "settings"
  | "gallery"
  | "services"
  | "about"
  | "visit-requests";

type SessionUserLike = { role: UserRole } | null | undefined;

/**
 * Single permission gate for the whole dashboard.
 * Admins can do everything; editors are read-only for now.
 */
export function can(
  user: SessionUserLike,
  action: Action,
  resource: Resource,
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  void resource;
  return action === "read";
}
