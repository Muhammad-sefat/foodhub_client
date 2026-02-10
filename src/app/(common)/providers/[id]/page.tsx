/* eslint-disable @typescript-eslint/no-explicit-any */
import MealCard from "@/components/common/meals/MealCard";
import { ProviderServerService } from "@/services/provider.server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProviderDetailsPage({ params }: Props) {
  const { id } = await params;

  const provider = await ProviderServerService.getProviderById(id);

  if (!provider) {
    return <div className="p-10">Provider not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Provider Info */}
      <div className="mb-8 rounded-lg bg-green-600 p-6 text-white">
        <h1 className="text-3xl font-bold">{provider.restaurant}</h1>
        <p className="text-sm">{provider.address}</p>
      </div>

      {/* Meals */}
      <h2 className="mb-4 text-xl font-semibold text-black">Menu</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {provider.meals.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
