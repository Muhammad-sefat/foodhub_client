import OrderCard from "@/components/customer/OrderCard";

const orders = [
  { id: "101", restaurant: "Burger House", status: "DELIVERED", total: "18.5" },
  { id: "102", restaurant: "Pizza Palace", status: "PREPARING", total: "22.0" },
];

export default function MyOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Orders</h2>

      {orders.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
}
