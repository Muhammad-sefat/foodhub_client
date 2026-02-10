/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface ProfileData {
  restaurant: string;
  address: string;
}

export const ProviderServerService = {
  // Get provider profile
  async getProfile() {
    try {
      console.log("[ProviderServerService] Fetching profile");
      const response = await serverFetch(`${API_URL}/api/provider/dashboard`);
      console.log("[ProviderServerService] Profile received:", response);

      return response.data || response;
    } catch (error: any) {
      console.error(
        "[ProviderServerService] Get profile error:",
        error.message,
      );
      return null;
    }
  },

  // Get provider meals
  async getMyMeals() {
    try {
      console.log("[ProviderServerService] Fetching provider meals");

      const response = await serverFetch(`${API_URL}/api/provider/meals`);

      console.log("[ProviderServerService] Provider meals received:", response);

      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      console.error(
        "[ProviderServerService] Get provider meals error 👉",
        error.message,
      );
      return [];
    }
  },

  // Get provider orders
  async getOrders() {
    try {
      console.log("[ProviderServerService] Fetching orders");
      const response = await serverFetch(`${API_URL}/api/provider/orders`);
      console.log("[ProviderServerService] Orders received:", response);

      // Backend returns { success: true, data: [...] }
      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      // Check if error message contains 403 or "No provider profile" to suppress noise
      if (
        error.message &&
        (error.message.includes("403") ||
          error.message.includes("No provider profile"))
      ) {
        console.log(
          "[ProviderServerService] No provider profile found (returning empty orders)",
        );
      } else {
        console.error("[ProviderServerService] Get orders error 👉", error);
      }
      return [];
    }
  },

  // Get dashboard stats
  async getDashboardStats() {
    try {
      console.log("[ProviderServerService] Calculating dashboard stats");
      const orders = await this.getOrders();

      const totalOrders = orders.length;
      const activeOrders = orders.filter(
        (order: any) =>
          order.status !== "DELIVERED" && order.status !== "CANCELLED",
      ).length;
      const revenue = orders
        .filter((order: any) => order.status === "DELIVERED")
        .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

      const stats = {
        totalOrders,
        activeOrders,
        revenue,
      };

      console.log("[ProviderServerService] Dashboard stats:", stats);
      return stats;
    } catch (error) {
      console.error(
        "[ProviderServerService] Get dashboard stats error 👉",
        error,
      );
      return {
        totalOrders: 0,
        activeOrders: 0,
        revenue: 0,
      };
    }
  },

  // Get all providers (PUBLIC)
  async getAllProviders() {
    try {
      const response = await serverFetch(`${API_URL}/api/providers`);
      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("[ProviderServerService] Get providers error 👉", error);
      return [];
    }
  },

  // Get provider details (PUBLIC)
  async getProviderById(id: string) {
    try {
      const response = await serverFetch(`${API_URL}/api/providers/${id}`);
      return response.data || response;
    } catch (error) {
      console.error("[ProviderServerService] Get provider error 👉", error);
      return null;
    }
  },
};
