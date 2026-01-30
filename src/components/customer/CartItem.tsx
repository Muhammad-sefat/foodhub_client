export default function CartItem({
  name,
  price,
  qty,
}: {
  name: string;
  price: number;
  qty: number;
}) {
  return (
    <div className="flex justify-between items-center bg-white p-4 border rounded-lg">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">
          ${price} × {qty}
        </p>
      </div>

      <p className="font-bold">${(price * qty).toFixed(2)}</p>
    </div>
  );
}
