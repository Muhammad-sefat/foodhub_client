import CartItem from "@/components/customer/CartItem";

const cartItems = [
  { name: "Chicken Burger", price: 6.5, qty: 2 },
  { name: "Pepperoni Pizza", price: 8.5, qty: 1 },
];

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Cart</h2>

      {cartItems.map((item, i) => (
        <CartItem key={i} {...item} />
      ))}

      <div className="text-right font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>

      {/* <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
        Proceed to Checkout
      </button> */}
    </div>
  );
}
