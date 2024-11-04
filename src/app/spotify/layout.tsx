"use client";

import SideNav from "@/src/app/ui/sidenav";
import { useTokenRefresh } from "@/src/app/tools/useTokenRefresh";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  useTokenRefresh();

  return (
    <div className="flex p-3 gap-3 h-screen overflow-hidden bg-black">
      <SideNav />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <div className="flex-grow bg-[#161616] rounded-lg">{children}</div>
      </Suspense>
    </div>
  );
}
