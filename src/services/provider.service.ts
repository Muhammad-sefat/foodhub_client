const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface ProfileData {
    restaurant: string;
    address: string;
}

export const ProviderService = {
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
};

