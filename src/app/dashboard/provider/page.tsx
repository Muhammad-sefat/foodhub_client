import StatCard from "@/components/provider/StatCard";
import { ProviderServerService } from "@/services/provider.server";
import Link from "next/link";

export default async function ProviderDashboard() {
  const profile = await ProviderServerService.getProfile();

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">Become a Provider 🍳</h2>
        <p className="text-gray-500 mb-6">Create your restaurant profile to start managing orders.</p>
        <Link 
          href="/dashboard/provider/profile" 
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  const stats = await ProviderServerService.getDashboardStats();

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
