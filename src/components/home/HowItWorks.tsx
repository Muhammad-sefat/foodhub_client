export function HowItWorks() {
  const steps = [
    {
      title: "Browse Meals",
      desc: "Explore meals from multiple providers",
    },
    {
      title: "Place Order",
      desc: "Add meals and checkout easily",
    },
    {
      title: "Track & Enjoy",
      desc: "Track your order and enjoy your food",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-2xl font-semibold text-black">
          How FoodHub Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="text-center border p-6 rounded-lg hover:bg-green-50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                {index + 1}
              </div>
              <h3 className="font-semibold text-black">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
