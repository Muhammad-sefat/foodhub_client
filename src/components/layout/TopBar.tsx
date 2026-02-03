"use client";

import { Role } from "@/constants/roles";

export default function Topbar({
  onMenuClick,
  role,
}: {
  onMenuClick: () => void;
  role: Role;
}) {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4">
      <button onClick={onMenuClick} className="md:hidden mr-3 text-gray-600">
        ☰
      </button>

      <h1 className="text-sm font-semibold text-gray-800">{role} Dashboard</h1>
    </header>
  );
}
