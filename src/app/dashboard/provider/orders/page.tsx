import OrderRow from "@/components/provider/OrderRow";

const orders = [
  {
    id: "ORD-101",
    customer: "Sefat",
    total: 18.5,
    status: "PLACED",
  },
  {
    id: "ORD-102",
    customer: "Rahim",
    total: 22,
    status: "PREPARING",
  },
];

export default function ProviderOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Incoming Orders</h2>

      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="w-full text-sm p-2">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody className="p-2">
            {orders.map((order) => (
              <OrderRow key={order.id} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
