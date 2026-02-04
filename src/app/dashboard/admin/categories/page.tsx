/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import CategoryCard from "@/components/admin/CategoryCard";
import { CategoryService } from "@/services/category.service";

export default async function AdminCategoriesPage() {
  const categories = await CategoryService.getAll();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <AddCategoryModal />
      </div>

      {categories.length === 0 ? (
        <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
          No categories found 🍽️
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat: any) => (
            <CategoryCard key={cat.id} name={cat.name} />
          ))}
        </div>
      )}
    </div>
  );
}
