export interface CartItem {
  id: string; // mealId
  name: string;
  price: number;
  restaurantId: string;
  restaurantName: string; // Useful for display
  qty: number;
}

export const CartUtils = {
  getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem("foodhub_cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart(item: CartItem) {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.qty += item.qty;
    } else {
      cart.push(item);
    }

    localStorage.setItem("foodhub_cart", JSON.stringify(cart));
    // Dispatch event for storage updates if needed across tabs/components
    window.dispatchEvent(new Event("storage"));
  },

  removeFromCart(itemId: string) {
    const cart = this.getCart().filter((i) => i.id !== itemId);
    localStorage.setItem("foodhub_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  },

  updateQty(itemId: string, qty: number) {
    const cart = this.getCart().map((item) => {
      if (item.id === itemId) {
        return { ...item, qty: Math.max(1, qty) };
      }
      return item;
    });
    localStorage.setItem("foodhub_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  },

  clearCart() {
    localStorage.removeItem("foodhub_cart");
    window.dispatchEvent(new Event("storage"));
  },

  calculateTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },
};
