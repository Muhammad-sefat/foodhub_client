"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CategoryService } from "@/services/category.service";
import { MealService } from "@/services/meal.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditMealModalProps {
    meal: any;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function EditMealModal({ meal, open, setOpen }: EditMealModalProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await CategoryService.getAll();
            setCategories(data);
        };
        if (open) fetchCategories();
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            categoryId: formData.get("categoryId") as string,
            imageUrl: formData.get("imageUrl") as string,
        };

        try {
            await MealService.update(meal.id, data);
            toast.success("Meal updated successfully! 🍳");
            setOpen(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to update meal");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Meal</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="title"
                        placeholder="Meal title"
                        defaultValue={meal.title}
                        required
                        disabled={isLoading}
                    />

                    <Textarea
                        name="description"
                        placeholder="Meal description"
                        defaultValue={meal.description}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        defaultValue={meal.price}
                        required
                        disabled={isLoading}
                    />

                    <Select name="categoryId" defaultValue={meal.categoryId} required disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        name="imageUrl"
                        placeholder="Image URL (optional)"
                        defaultValue={meal.imageUrl}
                        disabled={isLoading}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
