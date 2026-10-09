import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, now, type UserRole } from "@/features/users/schema";
import { loginSchema } from "@/lib/validators/auth";
import { clearAttempts } from "@/features/auth/rate-limit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = parsed.data.email;
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.active) return null;

        const ok = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );
        if (!ok) return null;

        const ts = now();
        await db
          .update(users)
          .set({ lastLoginAt: ts })
          .where(eq(users.id, user.id));
        await clearAttempts(email);

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") session.user.id = token.id;
      if (token.role === "admin" || token.role === "editor") {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
};

/** Current session user, or null. Server components/actions only. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  return (session?.user as SessionUser | undefined) ?? null;
}

/** Throws-redirect helper for pages that require a signed-in user. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}
