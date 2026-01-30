import MenuItemCard from "@/components/provider/MenuItemCard";

const menuItems = [
  { title: "Chicken Burger", price: 6.5, category: "Burger" },
  { title: "Pepperoni Pizza", price: 8.5, category: "Pizza" },
  { title: "Club Sandwich", price: 5.5, category: "Sandwich" },
];

export default function ProviderMenuPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Menu</h2>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Meal
        </button>
      </div>

      {menuItems.map((item, i) => (
        <MenuItemCard key={i} {...item} />
      ))}
    </div>
  );
}
