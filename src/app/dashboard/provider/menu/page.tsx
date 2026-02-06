import AddMealModal from "@/components/provider/AddMealModal";
import MenuItemCard from "@/components/provider/MenuItemCard";
import { ProviderServerService } from "@/services/provider.server";

export default async function ProviderMenuPage() {
  const meals = await ProviderServerService.getMeals();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Menu</h2>

        <AddMealModal />
      </div>

      {meals.length === 0 ? (
        <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
          No meals found. Start by adding one! 🍽️
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map((item: any) => (
            <MenuItemCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
