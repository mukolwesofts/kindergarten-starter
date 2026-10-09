"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { can } from "@/lib/permissions";
import type { SessionUser } from "@/lib/auth";
import { signOutAction } from "@/features/auth/sign-out";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Palette,
    Images,
    Sparkles,
    Info,
    CalendarCheck,
    Menu,
    X,
    LogOut,
} from "lucide-react";

const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/users", icon: Users },
    { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
] as const;

const comingSoon = [
    { label: "Gallery", icon: Images },
    { label: "Services", icon: Sparkles },
    { label: "About", icon: Info },
    { label: "Visit requests", icon: CalendarCheck },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();
    return (
        <nav aria-label="Dashboard" className="flex flex-col gap-1">
            {navItems.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 font-display text-sm font-medium",
                        pathname === item.href
                            ? "bg-soft text-brand"
                            : "text-ink hover:bg-soft",
                    )}
                >
                    <item.icon aria-hidden="true" className="size-4" />
                    {item.label}
                </a>
            ))}

            <p className="mt-6 mb-1 px-4 font-display text-xs font-semibold tracking-widest text-muted uppercase">
                Coming soon
            </p>
            {comingSoon.map((item) => (
                <span
                    key={item.label}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2.5 font-display text-sm font-medium text-muted"
                >
                    <item.icon aria-hidden="true" className="size-4" />
                    {item.label}
                    <span className="ml-auto rounded-pill bg-soft px-2 py-0.5 text-[10px] font-semibold text-muted">
                        Soon
                    </span>
                </span>
            ))}
        </nav>
    );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <div className="flex h-full flex-col gap-6 px-4 py-6">
            <Logo />
            <NavLinks onNavigate={onNavigate} />
            <Link
                href="/"
                className="mt-auto rounded px-4 text-xs text-muted underline underline-offset-2 hover:text-brand"
            >
                ← Back to the public site
            </Link>
        </div>
    );
}

export function DashboardShell({
    user,
    children,
}: {
    user: SessionUser;
    children: React.ReactNode;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isAdmin = can(user, "manage", "user");

    return (
        <div className="min-h-screen bg-surface">
            {/* Sidebar — desktop */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-surface md:block">
                <SidebarContent />
            </aside>

            {/* Sidebar — mobile */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-ink/40"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-lift">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink"
                        >
                            <X aria-hidden="true" className="size-5" />
                        </button>
                        <SidebarContent onNavigate={() => setMenuOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="md:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className="grid size-10 place-items-center rounded-full border border-line text-ink md:hidden"
                        >
                            <Menu aria-hidden="true" className="size-5" />
                        </button>
                        <p className="hidden font-display text-sm font-medium text-muted sm:block">
                            {site.name} — admin
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-ink">{user.name}</p>
                            <p className="text-xs text-muted capitalize">
                                {user.role}
                                {!isAdmin && " (read-only)"}
                            </p>
                        </div>
                        <form action={signOutAction}>
                            <button
                                type="submit"
                                className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-line px-4 py-2 font-display text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
                            >
                                <LogOut aria-hidden="true" className="size-4" />
                                Sign out
                            </button>
                        </form>
                    </div>
                </header>

                <main className="px-4 py-8 sm:px-6 lg:px-10">{children}</main>
            </div>
        </div>
    );
}
