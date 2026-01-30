"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { CURRENT_ROLE } from "@/constants/roles";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const links = sidebarLinks[CURRENT_ROLE];

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 bg-white border-r h-screen
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="p-5 text-xl font-bold text-green-600">
          <Link href="/">FoodHub</Link>
        </div>

        <nav className="px-3 space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md text-sm font-medium
                ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
