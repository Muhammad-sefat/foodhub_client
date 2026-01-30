import MealCard from "@/components/common/meals/MealCard";

const mealsResponse = {
  success: true,
  data: [
    {
      id: "233f66d5",
      title: "Chicken Burger",
      description: "Crispy chicken burger . this burger is so delicious",
      price: 6.5,
      category: { name: "Burger" },
      provider: { restaurant: "Burger House" },
    },
    {
      id: "23c5986c",
      title: "Club Sandwich",
      description: "Triple-layer sandwich with chicken, lettuce, and mayo",
      price: 5.5,
      category: { name: "Sandwich" },
      provider: { restaurant: "Burger House" },
    },
    {
      id: "af5a89cf",
      title: "Pepperoni Pizza",
      description: "Cheesy pizza topped with spicy pepperoni",
      price: 8.5,
      category: { name: "Pizza" },
      provider: { restaurant: "Pizza Palace" },
    },
    {
      id: "23c5986c",
      title: "Club Sandwich",
      description: "Triple-layer sandwich with chicken, lettuce, and mayo",
      price: 5.5,
      category: { name: "Sandwich" },
      provider: { restaurant: "Burger House" },
    },
  ],
};
export default function page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-black">Browse Meals</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mealsResponse.data.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
