"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";
import { loginSchema, LoginValues } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      // 🔍 Debug session
      const session = await authClient.getSession();
      console.log("SESSION:", session);

      toast.success("Login Successful", { id: toastId });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-2xl font-semibold text-black">
          Welcome back
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Login to your FoodHub account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
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
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
