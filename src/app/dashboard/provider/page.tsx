import StatCard from "@/components/provider/StatCard";

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Provider Dashboard 🍳</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orders" value="34" />
        <StatCard title="Active Orders" value="5" />
        <StatCard title="Total Revenue" value="$560.00" />
      </div>
    </div>
  );
}
