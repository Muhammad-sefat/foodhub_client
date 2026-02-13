/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserRow({ id, name, email, role, status }: any) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const nextStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
  const actionLabel = status === "ACTIVE" ? "Suspend User" : "Activate User";

  const handleToggle = async () => {
    setIsUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update user status");
      }

      toast.success(`User set to ${nextStatus}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="p-2">{name}</td>
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
          className={`text-xs hover:underline disabled:opacity-50 ${
            status === "ACTIVE" ? "text-red-600" : "text-green-600"
          }`}
        >
          {isUpdating ? "Updating..." : actionLabel}
        </button>
      </td>
    </tr>
  );
}
