"use client"

import SideNav from "@/app/ui/sidenav";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  // access_tokenがセットされるまでLoading状態を表示
  if (!accessToken) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex p-3 gap-3 h-screen overflow-hidden bg-black">
      <SideNav />
      <div className="flex-grow bg-[#161616] rounded-lg">{children}</div>
    </div>
  );
}