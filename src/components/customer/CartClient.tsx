/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CartItem, CartUtils } from "@/utils/cart.utils";
import { CustomerService } from "@/services/customer.service";
import CartItemRow from "./CartItemRow";
import { Button } from "@/components/ui/button";

export default function CartClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCartItems(CartUtils.getCart());
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!cartItems.length) return;

    setIsLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          mealId: item.id,
          quantity: item.qty,
        })),
        address: "Customer delivery address",
      };

      await CustomerService.createOrder(orderData);

      CartUtils.clearCart();
      toast.success("Order placed successfully 🍱");
      router.push("/dashboard/customer/orders");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Order failed");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQty = (id: string, qty: number) => {
    CartUtils.updateQty(id, qty);
    setCartItems(CartUtils.getCart());
  };

  const removeItem = (id: string) => {
    CartUtils.removeFromCart(id);
    setCartItems(CartUtils.getCart());
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                id={item.id}
                title={item.name}
                price={item.price}
                qty={item.qty}
                onIncrease={() => updateQty(item.id, item.qty + 1)}
                onDecrease={() => updateQty(item.id, item.qty - 1)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Placing Order..." : "Checkout (Cash on Delivery)"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
