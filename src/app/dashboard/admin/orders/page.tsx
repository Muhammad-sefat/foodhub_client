/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import AdminOrderRow from "@/components/admin/OrderRow";
import { AdminService } from "@/services/admin.service";

export default async function AdminOrdersPage() {
  const orders = await AdminService.getAllOrders();

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No orders found yet 📦
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <AdminOrderRow
                  key={order.id}
                  id={order.id}
                  customer={order.customer?.name || "—"}
                  provider={order.provider?.restaurant || "—"}
                  total={order.totalAmount}
                  status={order.status}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
