import MealCard from "@/components/common/meals/MealCard";
import { MealService } from "@/services/meal.service";

export default async function page() {
  const meals = await MealService.getAll();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-black">Browse Meals</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
