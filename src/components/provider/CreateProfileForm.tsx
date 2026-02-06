"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProviderService } from "@/services/provider.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  restaurant: z.string().min(2, "Restaurant name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await ProviderService.createProfile(data);
      toast.success("Profile created successfully! 🍳");
      router.push("/dashboard/provider");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Setup Your Kitchen</h1>
        <p className="text-sm text-gray-500 mt-2">
          Tell us about your restaurant to start receiving orders.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="restaurant" className="text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <Input
            id="restaurant"
            placeholder="e.g. Tasty Bites"
            disabled={isLoading}
            {...register("restaurant")}
            className={errors.restaurant ? "border-red-500" : ""}
          />
          {errors.restaurant && (
            <p className="text-xs text-red-500">{errors.restaurant.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Address
          </label>
          <Textarea
            id="address"
            placeholder="e.g. 123 Food Street, New York"
            disabled={isLoading}
            {...register("address")}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
          disabled={isLoading}
        >
          {isLoading ? "Creating Profile..." : "Create Profile"}
        </Button>
      </form>
    </div>
  );
}
