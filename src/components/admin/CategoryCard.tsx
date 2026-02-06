"use client";

import { CategoryService } from "@/services/category.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryCard({ id, name }: { id: string, name: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if(!confirm(`Are you sure you want to delete ${name}?`)) return;

    setIsDeleting(true);
    try {
      await CategoryService.delete(id);
      toast.success("Category deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
      <p className="font-medium">{name}</p>
      <button 
        onClick={handleDelete}
        disabled={isDeleting} 
        className="text-sm text-red-500 hover:underline disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
