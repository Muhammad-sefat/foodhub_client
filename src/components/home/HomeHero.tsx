export function HomeHero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-black md:text-5xl">
          Discover & Order{" "}
          <span className="text-green-600">Delicious Meals</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Browse meals from trusted local food providers and get your favorite
          food delivered fast.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/meals"
            className="rounded bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700"
          >
            Browse Meals
          </a>

          <a
            href="/register"
            className="rounded border border-green-600 px-6 py-3 font-medium text-green-600 hover:bg-green-100"
          >
            Become a Provider
          </a>
        </div>
      </div>
    </section>
  );
}
