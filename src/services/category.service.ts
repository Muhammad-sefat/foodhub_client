const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const CategoryService = {
  async getAll() {
    try {
      console.log("[CategoryService] Fetching from:", `${API_URL}/api/categories`);
      const res = await fetch(`${API_URL}/api/categories`, {
        credentials: "include",
        cache: "no-store",
      });

      console.log("[CategoryService] Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("[CategoryService] Error response:", errorText);
        throw new Error(`Failed to fetch categories: ${res.status} - ${errorText}`);
      }

      const response = await res.json();
      console.log("[CategoryService] Received data:", response);

      // Backend returns { success: true, data: [...] }
      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("[CategoryService] Get categories error 👉", error);
      return [];
    }
  },

  async create(name: string) {
    try {
      const res = await fetch(`${API_URL}/api/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `Failed to create category (${res.status})`;
        throw new Error(errorMessage);
      }

      return await res.json();
    } catch (error) {
      console.error("Create category error 👉", error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      return true;
    } catch (error) {
      console.error("Delete category error 👉", error);
      throw error;
    }
  },
};
