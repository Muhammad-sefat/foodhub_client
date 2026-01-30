export function HomeCategories() {
  const categories = ["Burger", "Pizza", "Biryani", "Dessert"];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-2xl font-semibold text-black">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat}
              className="cursor-pointer rounded-lg border bg-green-50 border-gray-200 p-6 text-center hover:border-green-600 hover:bg-green-100"
            >
              <p className="font-medium text-gray-800">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
