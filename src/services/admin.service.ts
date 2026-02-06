import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const AdminService = {
  async getDashboardStats() {
    try {
      console.log("[AdminService] Fetching dashboard stats from:", API_URL);
      const usersResponse = await serverFetch(`${API_URL}/api/admin/users`);
      console.log("[AdminService] Users response:", usersResponse);

      const ordersResponse = await serverFetch(`${API_URL}/api/admin/orders`);
      console.log("[AdminService] Orders response:", ordersResponse);

      // Backend returns { success: true, data: [...] }
      const users = usersResponse.data || usersResponse;
      const orders = ordersResponse.data || ordersResponse;

      if (!Array.isArray(users) || !Array.isArray(orders)) {
        console.error("[AdminService] Invalid response shape - users:", typeof users, "orders:", typeof orders);
        throw new Error("Invalid admin response shape");
      }

      const stats = {
        totalUsers: users.length,
        providers: users.filter((u) => u.role === "PROVIDER").length,
        orders: orders.length,
        revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
      };

      console.log("[AdminService] Calculated stats:", stats);
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
    console.log("[AdminService] Fetching all users from:", `${API_URL}/api/admin/users`);
    const response = await serverFetch(`${API_URL}/api/admin/users`);
    console.log("[AdminService] Users response:", response);

    // Backend returns { success: true, data: [...] }
    const users = response.data || response;
    return Array.isArray(users) ? users : [];
  },

  async getAllOrders() {
    const response = await serverFetch(`${API_URL}/api/admin/orders`);

    // Backend returns { success: true, data: [...] }
    const orders = response.data || response;
    return Array.isArray(orders) ? orders : [];
  },

  async updateUserStatus(id: string, status: string) {
    try {
        console.log("[AdminService] Updating user status:", id, status);
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
  }
};
