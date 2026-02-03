"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import { Role } from "@/constants/roles";

export default function DashboardShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} role={role} />

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setOpen(true)} role={role} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
