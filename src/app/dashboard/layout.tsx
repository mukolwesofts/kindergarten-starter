import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return (
    <>
      <DashboardShell user={user}>{children}</DashboardShell>
      <Toaster richColors position="top-right" />
    </>
  );
}
