export default function OrderCard({
  id,
  restaurant,
  status,
  total,
}: {
  id: string;
  restaurant: string;
  status: string;
  total: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{restaurant}</p>
        <p className="text-sm text-gray-500">Order #{id}</p>
      </div>

      <div className="text-right">
        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
          {status}
        </span>
        <p className="mt-1 font-bold">${total}</p>
      </div>
    </div>
  );
}
