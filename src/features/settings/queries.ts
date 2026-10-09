import "server-only";
import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { settings } from "./schema";
import {
  appearanceSchema,
  defaultAppearance,
  type Appearance,
} from "@/lib/appearance";

const APPEARANCE_KEY = "appearance";

export const getAppearance = unstable_cache(
  async (): Promise<Appearance> => {
    const [row] = await db
      .select()
      .from(settings)
      .where(eq(settings.key, APPEARANCE_KEY));
    if (!row) return defaultAppearance;
    const parsed = appearanceSchema.safeParse(row.value);
    return parsed.success ? parsed.data : defaultAppearance;
  },
  ["appearance-settings"],
  { tags: ["appearance"] },
);
