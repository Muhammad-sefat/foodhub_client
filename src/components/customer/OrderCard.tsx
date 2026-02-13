/* eslint-disable @typescript-eslint/no-explicit-any */

export default function OrderCard({ order }: { order: any }) {
  const { id, status, totalAmount, createdAt, address, items, provider } =
    order;

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {provider?.restaurant || "Unknown Restaurant"}
          </h3>
          <p className="text-xs text-gray-500">Order #{id.slice(0, 8)}</p>
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium
            ${
              status === "PLACED"
                ? "bg-yellow-100 text-yellow-700"
                : status === "DELIVERED"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
            }`}
        >
          {status}
        </span>
      </div>

      {/* Address */}
      <div>
        <p className="text-sm text-gray-600">📍 Delivery Address</p>
        <p className="text-sm">{address}</p>
      </div>

      {/* Items */}
      <div className="border-t pt-3 space-y-2">
        <p className="text-sm font-medium">Items</p>

        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-between text-sm text-gray-700">
            <span>
              {item.meal?.title} × {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t pt-3 flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-lg">${totalAmount}</span>
      </div>
    </div>
  );
}
