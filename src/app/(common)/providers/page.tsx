/* eslint-disable @typescript-eslint/no-explicit-any */
import ProviderCard from "@/components/common/provider/ProviderCard";
import { ProviderServerService } from "@/services/provider.server";

export default async function RestaurantsPage() {
  const providers = await ProviderServerService.getAllProviders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-black">Restaurants</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider: any) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
