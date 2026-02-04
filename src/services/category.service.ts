const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const CategoryService = {
  async getAll() {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Get categories error 👉", error);
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
        throw new Error("Failed to create category");
      }

      return await res.json();
    } catch (error) {
      console.error("Create category error 👉", error);
      throw error;
    }
  },

  // async delete(id: string) {
  //   try {
  //     const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to delete category");
  //     }

  //     return true;
  //   } catch (error) {
  //     console.error("Delete category error 👉", error);
  //     throw error;
  //   }
  // },
};
