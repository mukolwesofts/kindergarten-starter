"use server";

import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { settings } from "./schema";
import { now } from "@/features/users/schema";
import { getSessionUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { appearanceSchema } from "@/lib/appearance";
import type { ActionResult } from "@/features/users/actions";

export async function saveAppearance(input: unknown): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, error: "You must be signed in." };
  if (!can(user, "manage", "settings")) {
    return { ok: false, error: "Only admins can change appearance." };
  }

  const parsed = appearanceSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  await db
    .insert(settings)
    .values({
      key: "appearance",
      value: parsed.data,
      updatedAt: now(),
    })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: parsed.data, updatedAt: now() },
    });

  // The saved values are injected on <html> in the root layout:
  // bust the cached settings read and re-render every page.
  revalidateTag("appearance", "max");
  revalidatePath("/", "layout");
  return { ok: true };
}
