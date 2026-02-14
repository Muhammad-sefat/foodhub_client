export const dynamic = "force-dynamic";

import DashboardShell from "@/components/layout/DashboardShell";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData } = await userService.getSession();
  const user = sessionData?.user;

  if (!user) {
    redirect("/login");
  }

  return <DashboardShell role={user.role}>{children}</DashboardShell>;
}
