"use client";
import React from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { useUserStore } from "@/app/lib/store";

export function Header() {
  const user = useUserStore((state) => state.user);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600"
        >
          PopPlan
        </Link>
        <div className="flex gap-4 items-center">
          <Navigation />
          <span className="text-black mr-2">|</span>
          <div className="border border-blue-500 p-2 rounded-md">
            <p className="text-sm text-gray-900 ">
              User: <span>{user}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
