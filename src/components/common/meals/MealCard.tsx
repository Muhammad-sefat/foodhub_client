import Link from "next/link";

type Meal = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  provider: {
    restaurant: string;
  };
};

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <Link href={`/meals/${meal.id}`}>
      <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
        {/* Image */}
        <div className="mb-4 flex h-40 items-center justify-center rounded bg-gray-100 text-gray-400">
          Meal Image
        </div>

        <h3 className="text-lg font-semibold text-black">{meal.title}</h3>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {meal.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-green-600">${meal.price}</span>

          <span className="text-xs text-gray-500">{meal.category.name}</span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          by {meal.provider.restaurant}
        </p>
      </div>
    </Link>
  );
}
