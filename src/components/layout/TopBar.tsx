"use client";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4">
      <button onClick={onMenuClick} className="md:hidden mr-3 text-gray-600">
        ☰
      </button>

      <h1 className="text-sm font-semibold text-gray-800">
        Customer Dashboard
      </h1>
    </header>
  );
}
