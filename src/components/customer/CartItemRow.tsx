"use client";

import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  title: string;
  price: number;
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemRow({
  title,
  price,
  qty,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex justify-between items-center border p-4 rounded-lg">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">${price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={onDecrease} disabled={qty <= 1}>
          −
        </Button>

        <span className="w-6 text-center">{qty}</span>

        <Button size="sm" onClick={onIncrease}>
          +
        </Button>

        <Button size="sm" variant="destructive" onClick={onRemove}>
          Delete
        </Button>
      </div>
    </div>
  );
}
