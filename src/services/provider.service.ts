import { serverFetch } from "@/lib/serverFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface ProfileData {
    restaurant: string;
    address: string;
}

export const ProviderService = {
    // Get provider profile
    async getProfile() {
        try {
            console.log("[ProviderService] Fetching profile");
            const response = await serverFetch(`${API_URL}/api/provider/dashboard`);
            console.log("[ProviderService] Profile received:", response);

            return response.data || response;
        } catch (error) {
            console.error("[ProviderService] Get profile error 👉", error);
            throw error;
        }
    },

    // Create provider profile
    async createProfile(profileData: ProfileData) {
        try {
            console.log("[ProviderService] Creating profile:", profileData);

            const res = await fetch(`${API_URL}/api/provider/profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profileData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || `Failed to create profile (${res.status})`;
                throw new Error(errorMessage);
            }

            const response = await res.json();
            console.log("[ProviderService] Profile created:", response);
            return response.data || response;
        } catch (error) {
            console.error("[ProviderService] Create profile error 👉", error);
            throw error;
        }
    },

    // Get provider orders
    async getOrders() {
        try {
            console.log("[ProviderService] Fetching orders");
            const response = await serverFetch(`${API_URL}/api/provider/orders`);
            console.log("[ProviderService] Orders received:", response);

            // Backend returns { success: true, data: [...] }
            const data = response.data || response;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("[ProviderService] Get orders error 👉", error);
            return [];
        }
    },

    // Update order status
    async updateOrderStatus(orderId: string, status: string) {
        try {
            console.log("[ProviderService] Updating order status:", orderId, status);

            const res = await fetch(`${API_URL}/api/provider/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || `Failed to update order status (${res.status})`;
                throw new Error(errorMessage);
            }

            const response = await res.json();
            console.log("[ProviderService] Order status updated:", response);
            return response;
        } catch (error) {
            console.error("[ProviderService] Update order status error 👉", error);
            throw error;
        }
    },

    // Get dashboard stats
    async getDashboardStats() {
        try {
            console.log("[ProviderService] Calculating dashboard stats");
            const orders = await this.getOrders();

            const totalOrders = orders.length;
            const activeOrders = orders.filter(
                (order: any) => order.status !== "DELIVERED" && order.status !== "CANCELLED"
            ).length;
            const revenue = orders
                .filter((order: any) => order.status === "DELIVERED")
                .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

            const stats = {
                totalOrders,
                activeOrders,
                revenue,
            };

            console.log("[ProviderService] Dashboard stats:", stats);
            return stats;
        } catch (error) {
            console.error("[ProviderService] Get dashboard stats error 👉", error);
            return {
                totalOrders: 0,
                activeOrders: 0,
                revenue: 0,
            };
        }
    },
};
