const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface MealData {
    title: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
}

export const MealService = {
    // Get all meals (public, optionally filter by category)
    async getAll(categoryId?: string) {
        try {
            const url = categoryId
                ? `${API_URL}/api/meals?categoryId=${categoryId}`
                : `${API_URL}/api/meals`;

            console.log("[MealService] Fetching from:", url);

            const res = await fetch(url, {
                credentials: "include",
                cache: "no-store",
            });

            console.log("[MealService] Response status:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("[MealService] Error response:", errorText);
                throw new Error(`Failed to fetch meals: ${res.status} - ${errorText}`);
            }

            const response = await res.json();
            console.log("[MealService] Received data:", response);

            // Backend returns { success: true, data: [...] }
            const data = response.data || response;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("[MealService] Get meals error 👉", error);
            return [];
        }
    },

    // Get meal by ID (public)
    async getById(id: string) {
        try {
            console.log("[MealService] Fetching meal:", id);

            const res = await fetch(`${API_URL}/api/meals/${id}`, {
                credentials: "include",
                cache: "no-store",
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch meal: ${res.status} - ${errorText}`);
            }

            const response = await res.json();
            return response.data || response;
        } catch (error) {
            console.error("[MealService] Get meal error 👉", error);
            throw error;
        }
    },

    // Create meal (provider only)
    async create(mealData: MealData) {
        try {
            console.log("[MealService] Creating meal:", mealData);

            const res = await fetch(`${API_URL}/api/provider/meals`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(mealData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || `Failed to create meal (${res.status})`;
                throw new Error(errorMessage);
            }

            const response = await res.json();
            console.log("[MealService] Meal created:", response);
            return response.data || response;
        } catch (error) {
            console.error("[MealService] Create meal error 👉", error);
            throw error;
        }
    },

    // Update meal (provider only)
    async update(id: string, mealData: Partial<MealData>) {
        try {
            console.log("[MealService] Updating meal:", id, mealData);

            const res = await fetch(`${API_URL}/api/provider/meals/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(mealData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || `Failed to update meal (${res.status})`;
                throw new Error(errorMessage);
            }

            const response = await res.json();
            console.log("[MealService] Meal updated:", response);
            return response;
        } catch (error) {
            console.error("[MealService] Update meal error 👉", error);
            throw error;
        }
    },

    // Delete meal (provider only)
    async delete(id: string) {
        try {
            console.log("[MealService] Deleting meal:", id);

            const res = await fetch(`${API_URL}/api/provider/meals/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.error || `Failed to delete meal (${res.status})`;
                throw new Error(errorMessage);
            }

            const response = await res.json();
            console.log("[MealService] Meal deleted:", response);
            return response;
        } catch (error) {
            console.error("[MealService] Delete meal error 👉", error);
            throw error;
        }
    },
};
