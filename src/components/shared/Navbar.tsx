"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Providers", href: "/providers" },
];

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
}

interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const handleDashboardClick = () => {
    if (!user) return;

    if (user.role === "ADMIN") {
      router.push("/dashboard/admin");
    } else if (user.role === "PROVIDER") {
      router.push("/dashboard/provider");
    } else {
      router.push("/dashboard/customer");
    }
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-600">
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
                className={`text-sm font-medium transition text-black ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none">
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDashboardClick}
                className="cursor-pointer"
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="cursor-not-allowed opacity-50"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
