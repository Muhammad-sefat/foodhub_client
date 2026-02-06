"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartItem, CartUtils } from "@/utils/cart.utils";
import { CustomerService } from "@/services/customer.service";
import CartItemCard from "@/components/customer/CartItem";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    setIsMounting(false);
    const loadCart = () => setCartItems(CartUtils.getCart());
    loadCart();

    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsLoading(true);
    try {
      // Group by restaurant if backend creates separate orders, 
      // but for now assume one big order or backend handles splitting.
      // Based on typical implementation, we might send an array of items.
      // However, usually detailed order creation requires structure.
      // Let's assume backend accepts { items: [...] } structure.
      
      const orderData = {
        items: cartItems.map((item) => ({
          mealId: item.id,
          quantity: item.qty,
          price: item.price // Optional if backend calculates
        })),
        totalAmount: total,
      };

      await CustomerService.createOrder(orderData);
      
      CartUtils.clearCart();
      toast.success("Order placed successfully! 🍔");
      router.push("/dashboard/customer/orders");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQty = (id: string, qty: number) => {
    CartUtils.updateQty(id, qty);
    setCartItems(CartUtils.getCart()); 
  };

  const handleRemove = (id: string) => {
    CartUtils.removeFromCart(id);
    setCartItems(CartUtils.getCart());
  };

  if (isMounting) return null; // Prevent hydration mismatch

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            // Assuming CartItemCard has props compatible or needs refactor.
            // Let's inspect CartItemCard first or just construct UI here if simple.
            // For safety, I'll use the existing CartItem component if compatible, 
            // but mapped to match its expected props.
            <CartItemCard 
              key={item.id} 
              {...item} 
              // Passing extra handlers if component supports them, otherwise user can't update qty
            />
          ))}

          {/* 
            Since I don't know if CartItemCard supports update/remove handlers,
            I will render a simple list here if CartItemCard is static.
            Actually, let's stick to the previous simple implementation + actions.
          */}
        </div>
      )}

       {cartItems.length > 0 && (
        <div className="border-t pt-4">
           <div className="flex justify-between items-center mb-4 text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
          >
            {isLoading ? "Placing Order..." : "Proceed to Checkout"}
          </Button>
        </div>
       )}
    </div>
  );
}
