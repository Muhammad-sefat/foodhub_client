import OrderCard from "@/components/customer/OrderCard";
import { CustomerServerService } from "@/services/customer.server";

export default async function MyOrdersPage() {
  const orders = await CustomerServerService.getOrders();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order: any) => <OrderCard key={order.id} {...order} />)
      )}
    </div>
  );
}
