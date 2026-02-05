/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderRow from "@/components/provider/OrderRow";
import { ProviderService } from "@/services/provider.service";

export default async function ProviderOrdersPage() {
  const orders = await ProviderService.getOrders();

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No incoming orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <OrderRow key={order.id} {...order} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
