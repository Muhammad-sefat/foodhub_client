import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const CustomerServerService = {
  // Get user's orders (Server Side)
  async getOrders() {
    try {
      console.log("[CustomerServerService] Fetching orders");
      const response = await serverFetch(`${API_URL}/api/orders`);
      console.log("[CustomerServerService] Orders received:", response);

      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("[CustomerServerService] Get orders error 👉", error);
      return [];
    }
  },

  // Get dashboard stats (Server Side)
  async getDashboardStats() {
    try {
      console.log("[CustomerServerService] Calculating dashboard stats");
      const orders = await this.getOrders();

      const totalOrders = orders.length;
      const pendingOrders = orders.filter(
        (order: any) =>
          order.status !== "DELIVERED" && order.status !== "CANCELLED"
      ).length;
      const totalSpent = orders.reduce(
        (sum: number, order: any) => sum + (order.totalAmount || 0),
        0
      );

      return {
        totalOrders,
        pendingOrders,
        totalSpent,
      };
    } catch (error) {
      console.error("[CustomerServerService] Get stats error 👉", error);
      return {
        totalOrders: 0,
        pendingOrders: 0,
        totalSpent: 0,
      };
    }
  },
};
