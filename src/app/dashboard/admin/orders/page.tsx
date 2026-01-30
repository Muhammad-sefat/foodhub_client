import AdminOrderRow from "@/components/admin/OrderRow";

const orders = [
  {
    id: "ORD-201",
    customer: "Sefat",
    provider: "Burger House",
    total: 25,
    status: "DELIVERED",
  },
  {
    id: "ORD-202",
    customer: "Rahim",
    provider: "Pizza Palace",
    total: 18,
    status: "PREPARING",
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">All Orders</h2>

      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">Order ID</th>
              <th>Customer</th>
              <th>Provider</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <AdminOrderRow key={order.id} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
