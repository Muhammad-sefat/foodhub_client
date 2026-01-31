"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function AddMealModal() {
  const [open, setOpen] = useState(false);

  // temporary static submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId"),
      imageUrl: formData.get("imageUrl"),
    };

    console.log("NEW MEAL 👉", data);

    // later:
    // await providerService.createMeal(data)

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">+ Add Meal</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Meal title" required />

          <Textarea
            name="description"
            placeholder="Meal description"
            required
          />

          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            required
          />

          <Select name="categoryId" required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {/* static for now, later API */}
              <SelectItem value="burger">Burger</SelectItem>
              <SelectItem value="pizza">Pizza</SelectItem>
              <SelectItem value="sandwich">Sandwich</SelectItem>
              <SelectItem value="pasta">Pasta</SelectItem>
            </SelectContent>
          </Select>

          <Input name="imageUrl" placeholder="Image URL (optional)" />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Meal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
