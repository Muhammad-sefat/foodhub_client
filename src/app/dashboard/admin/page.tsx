import AdminStatCard from "@/components/admin/AdminStatCard";
import { AdminService } from "@/services/admin.service";

export default async function AdminDashboardPage() {
  const stats = await AdminService.getDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Dashboard 📊</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers.toString()}
        />
        <AdminStatCard title="Providers" value={stats.providers.toString()} />
        <AdminStatCard title="Orders" value={stats.orders.toString()} />
        <AdminStatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>
    </div>
  );
}
