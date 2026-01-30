export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-lg lg:text-xl font-bold text-green-600">
            FoodHub
          </h2>

          <p className="text-sm text-gray-500">
            Discover & order delicious meals from your favorite providers.
          </p>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
