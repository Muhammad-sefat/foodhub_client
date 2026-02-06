"use client";

import { AdminService } from "@/services/admin.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserRow({ id, name, email, role, status }: any) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    const newStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      await AdminService.updateUserStatus(id, newStatus);
      toast.success(`User set to ${newStatus}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="py-2">{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <span
          className={`px-2 py-1 text-xs rounded ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>
      <td>
        <button 
          onClick={handleToggle} 
          disabled={isUpdating}
          className="text-xs text-green-600 hover:underline disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Toggle Status"}
        </button>
      </td>
    </tr>
  );
}
