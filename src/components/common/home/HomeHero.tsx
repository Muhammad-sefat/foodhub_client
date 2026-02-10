"use client";

import Link from "next/link";
import { useState } from "react";
import { BecomeProviderModal } from "./BecomeProviderModal";

type Props = {
  user: {
    id: string;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  } | null;
};

export function HomeHero({ user }: Props) {
  const [open, setOpen] = useState(false);

  const handleProviderClick = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (user.role === "PROVIDER") {
      window.location.href = "/provider/dashboard";
      return;
    }

    setOpen(true);
  };

  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-black md:text-5xl">
          Discover & Order{" "}
          <span className="text-green-600">Delicious Meals</span>
        </h1>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/meals"
            className="rounded bg-green-600 px-6 py-3 text-white font-medium"
          >
            Browse Meals
          </Link>

          <button
            onClick={handleProviderClick}
            className="rounded border border-green-600 px-6 py-3 font-medium text-green-600"
          >
            Become a Provider
          </button>
        </div>

        <BecomeProviderModal open={open} onClose={() => setOpen(false)} />
      </div>
    </section>
  );
}
