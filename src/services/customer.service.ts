const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const CustomerService = {
  // Create new order
  async createOrder(orderData: any) {
    try {
      console.log("[CustomerService] Creating order:", orderData);

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          errorData.error ||
          `Failed to create order (${res.status})`;
        throw new Error(errorMessage);
      }

      const response = await res.json();
      console.log("[CustomerService] Order created:", response);
      return response.data || response;
    } catch (error) {
      console.error("[CustomerService] Create order error 👉", error);
      throw error;
    }
  },

  // Get User Orders (Client Side)
  async getOrdersClient() {
    try {
        console.log("[CustomerService] Fetching orders (Client)");
        const res = await fetch(`${API_URL}/api/orders`, {
            credentials: "include"
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch orders");
        }

        const response = await res.json();
        const data = response.data || response;
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("[CustomerService] Get orders error 👉", error);
        return [];
    }
  }
};
