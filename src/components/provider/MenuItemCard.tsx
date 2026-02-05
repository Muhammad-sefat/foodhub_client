"use client";

import { MealService } from "@/services/meal.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditMealModal from "./EditMealModal";

interface MenuItemCardProps {
  id: string;
  title: string;
  price: number;
  category?: { id: string; name: string } | any;
  description?: string;
  imageUrl?: string;
  categoryId: string;
}

export default function MenuItemCard({
  id,
  title,
  price,
  category,
  description,
  imageUrl,
  categoryId,
}: MenuItemCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(true);
    try {
      await MealService.delete(id);
      toast.success("Meal deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete meal");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={`bg-white border rounded-lg p-4 flex justify-between items-center ${isDeleting ? "opacity-50" : ""}`}>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">
            {typeof category === "object" ? category.name : category}
          </p>
        </div>

        <div className="text-right space-y-1">
          <p className="font-bold">${price}</p>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => setEditOpen(true)}
              className="text-xs text-green-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs text-red-600 hover:underline disabled:text-gray-400"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <EditMealModal
        open={editOpen}
        setOpen={setEditOpen}
        meal={{ id, title, price, categoryId, description, imageUrl }}
      />
    </>
  );
}
