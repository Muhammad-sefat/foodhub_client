import AddCategoryModal from "@/components/admin/AddCategoryModal";
import CategoryCard from "@/components/admin/CategoryCard";

const categories = ["Burger", "Pizza", "Pasta", "Sandwich"];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>

        <AddCategoryModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat} name={cat} />
        ))}
      </div>
    </div>
  );
}
