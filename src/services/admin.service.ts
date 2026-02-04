import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const AdminService = {
  async getDashboardStats() {
    try {
      const users = await serverFetch(`${API_URL}/api/admin/users`);
      const orders = await serverFetch(`${API_URL}/api/admin/orders`);

      if (!Array.isArray(users) || !Array.isArray(orders)) {
        throw new Error("Invalid admin response shape");
      }

      return {
        totalUsers: users.length,
        providers: users.filter((u) => u.role === "PROVIDER").length,
        orders: orders.length,
        revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    } catch (error) {
      console.error("Admin dashboard error 👉", error);

      return {
        totalUsers: 0,
        providers: 0,
        orders: 0,
        revenue: 0,
      };
    }
  },

  async getAllUsers() {
    const users = await serverFetch(`${API_URL}/api/admin/users`);
    return Array.isArray(users) ? users : [];
  },

  async getAllOrders() {
    const orders = await serverFetch(`${API_URL}/api/admin/orders`);
    return Array.isArray(orders) ? orders : [];
  },
};
