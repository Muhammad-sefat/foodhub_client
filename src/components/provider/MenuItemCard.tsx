export default function MenuItemCard({
  title,
  price,
  category,
}: {
  title: string;
  price: number;
  category: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{category}</p>
      </div>

      <div className="text-right space-y-1">
        <p className="font-bold">${price}</p>
        <button className="text-xs text-green-600 hover:underline">Edit</button>
      </div>
    </div>
  );
}
