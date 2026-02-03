import DashboardShell from "@/components/layout/DashboardShell";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData } = await userService.getSession();
  const user = sessionData?.user;
  return <DashboardShell role={user.role}>{children}</DashboardShell>;
}
