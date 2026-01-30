export function FeaturedMeals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-black">Popular Meals</h2>

          <a
            href="/meals"
            className="text-sm font-medium text-green-600 hover:underline"
          >
            View all
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-3 h-40 rounded bg-gray-200" />

              <h3 className="font-semibold text-black">Chicken Burger</h3>
              <p className="text-sm text-gray-600">
                Crispy chicken burger with sauce
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-green-600">$6.50</span>
                <button className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
