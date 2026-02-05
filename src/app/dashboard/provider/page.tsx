import StatCard from "@/components/provider/StatCard";
import { ProviderService } from "@/services/provider.service";

export default async function ProviderDashboard() {
  const stats = await ProviderService.getDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Provider Dashboard 🍳</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders.toString()} />
        <StatCard title="Active Orders" value={stats.activeOrders.toString()} />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
        />
      </div>
    </div>
  );
}
