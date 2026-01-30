import StatCard from "@/components/customer/StatCard";

export default function page() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Welcome back 👋</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orders" value="12" />
        <StatCard title="Pending Orders" value="2" />
        <StatCard title="Total Spent" value="$124.50" />
      </div>
    </div>
  );
}
