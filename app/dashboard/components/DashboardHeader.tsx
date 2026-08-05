"use client";

import LogoutButton from "../LogoutButton";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Codivra
        </h1>

        <LogoutButton />
      </div>
    </header>
  );
}