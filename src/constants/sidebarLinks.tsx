import { Role } from "./roles";

export const sidebarLinks: Record<Role, { name: string; href: string }[]> = {
  CUSTOMER: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Orders", href: "/dashboard/orders" },
    { name: "Cart", href: "/dashboard/cart" },
    { name: "Profile", href: "/dashboard/profile" },
  ],

  PROVIDER: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Menu", href: "/dashboard/menu" },
    { name: "Orders", href: "/dashboard/orders" },
  ],

  ADMIN: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Categories", href: "/dashboard/categories" },
  ],
};
