import StatCard from "@/components/customer/StatCard";
import { CustomerServerService } from "@/services/customer.server";

export default async function page() {
  const stats = await CustomerServerService.getDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Welcome back 👋</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders.toString()} />
        <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} />
        <StatCard title="Total Spent" value={`$${stats.totalSpent.toFixed(2)}`} />
      </div>
    </div>
  );
}
