import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Dashboard 📊</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AdminStatCard title="Total Users" value="120" />
        <AdminStatCard title="Providers" value="18" />
        <AdminStatCard title="Orders" value="340" />
        <AdminStatCard title="Revenue" value="$4,520" />
      </div>
    </div>
  );
}
