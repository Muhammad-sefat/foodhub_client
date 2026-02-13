import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const AdminService = {
  async getDashboardStats() {
    try {
      const usersResponse = await serverFetch(`${API_URL}/api/admin/users`);
      const ordersResponse = await serverFetch(`${API_URL}/api/admin/orders`);
      const users = usersResponse.data || usersResponse;
      const orders = ordersResponse.data || ordersResponse;

      if (!Array.isArray(users) || !Array.isArray(orders)) {
        console.error(
          "[AdminService] Invalid response shape - users:",
          typeof users,
          "orders:",
          typeof orders,
        );
        throw new Error("Invalid admin response shape");
      }

      const stats = {
        totalUsers: users.length,
        providers: users.filter((u) => u.role === "PROVIDER").length,
        orders: orders.length,
        revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
      };

      return stats;
    } catch (error) {
      console.error("[AdminService] Dashboard error 👉", error);

      return {
        totalUsers: 0,
        providers: 0,
        orders: 0,
        revenue: 0,
      };
    }
  },

  async getAllUsers() {
    const response = await serverFetch(`${API_URL}/api/admin/users`);
    const users = response.data || response;
    return Array.isArray(users) ? users : [];
  },

  async getAllOrders() {
    const response = await serverFetch(`${API_URL}/api/admin/orders`);
    const orders = response.data || response;
    return Array.isArray(orders) ? orders : [];
  },

  async updateUserStatus(id: string, status: string) {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user status");
      }

      return await res.json();
    } catch (error) {
      console.error("[AdminService] Update user status error 👉", error);
      throw error;
    }
  },
};
