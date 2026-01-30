import { Role } from "./roles";

export const sidebarLinks: Record<Role, { name: string; href: string }[]> = {
  CUSTOMER: [
    { name: "Dashboard", href: "/dashboard/customer" },
    { name: "My Orders", href: "/dashboard/customer/orders" },
    { name: "Cart", href: "/dashboard/customer/cart" },
    { name: "Profile", href: "/dashboard/customer/profile" },
  ],

  PROVIDER: [
    { name: "Dashboard", href: "/dashboard/provider" },
    { name: "Menu", href: "/dashboard/provider/menu" },
    { name: "Orders", href: "/dashboard/provider/orders" },
  ],

  ADMIN: [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Orders", href: "/dashboard/admin/orders" },
    { name: "Categories", href: "/dashboard/admin/categories" },
  ],
};
