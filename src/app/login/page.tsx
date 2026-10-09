import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { site } from "@/config/site";
import { LoginForm } from "@/features/auth/components/login-form";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Sign in",
    robots: { index: false, follow: false },
};

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) redirect("/dashboard");

    return (
        <main className="grid min-h-screen place-items-center bg-soft px-4 py-10">
            <Container className="max-w-md">
                <Card className="flex flex-col gap-6 p-8">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <Logo />
                        <div>
                            <h1 className="text-2xl font-medium">Welcome back</h1>
                            <p className="mt-1 text-sm text-muted">
                                Sign in to the {site.shortName} dashboard.
                            </p>
                        </div>
                    </div>
                    <LoginForm />
                    <p className="text-center text-xs text-muted">
                        Staff only — parents, please use the{" "}
                        <Link
                                href="/"
                                className="rounded text-brand underline underline-offset-2"
                            >
                            main site
                        </Link>
                        .
                    </p>
                </Card>
            </Container>
        </main>
    );
}
