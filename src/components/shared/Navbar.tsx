"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Providers", href: "/providers" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-500">
          FoodHub
        </Link>

        {/* Middle Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-green-500"
                    : "text-gray-600 hover:text-green-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <Link
          href="/login"
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
