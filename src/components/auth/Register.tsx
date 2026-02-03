"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";
import { registerSchema, RegisterValues } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    const toastId = toast.loading("Creating user...");
    try {
      const res = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Account created. Please login.", { id: toastId });
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-2xl font-semibold text-black">
          Create an account
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Join FoodHub and start ordering delicious meals
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Full name"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <select
              {...register("role")}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="PROVIDER">Provider</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login */}
        <button className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 py-2 hover:bg-gray-50">
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
