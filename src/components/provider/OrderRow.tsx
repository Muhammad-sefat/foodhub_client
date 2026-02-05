"use client";

import { ProviderService } from "@/services/provider.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrderRow({
  id,
  user,
  totalAmount,
  status,
}: {
  id: string;
  user: { name: string };
  totalAmount: number;
  status: string;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await ProviderService.updateOrderStatus(id, newStatus);
      toast.success(`Order set to ${newStatus}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="p-2 font-mono text-xs max-w-[100px] truncate" title={id}>{id}</td>
      <td>{user.name}</td>
      <td>${totalAmount}</td>
      <td>
        <span className={`px-2 py-1 text-xs rounded ${STATUS_COLORS[status] || "bg-gray-100 text-gray-700"}`}>
          {status}
        </span>
      </td>
      <td>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className="border rounded px-2 py-1 text-sm disabled:opacity-50"
        >
          <option value="PLACED">PLACED</option>
          <option value="PREPARING">PREPARING</option>
          <option value="READY">READY</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        {isUpdating && <span className="ml-2 text-xs text-gray-500 animate-pulse">...</span>}
      </td>
    </tr>
  );
}
