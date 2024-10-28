"use client";

import SideNav from "@/src/app/ui/sidenav";
import { useEffect, useState, useSyncExternalStore } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const token = localStorage.getItem("access_token");
  //     if (token) {
  //       setAccessToken(token);
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // if (!accessToken) {
  //   return <div>Loading...</div>;
  // }

  // function getAccessToken() {
  //   return localStorage.getItem("access_token");
  // }

  // function subscribe(callback: () => void) {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (event.key === "access_token") {
  //       callback();
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }

  // const accessToken = useSyncExternalStore(
  //   (callback) => subscribe(callback),
  //   getAccessToken
  // );

  // if (!accessToken) {
  //   return <div>Loading...</div>;
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   console.log("layout: ", token);
  //   setAccessToken(token);
  // }, []);

  // // access_tokenがセットされるまでLoading状態を表示
  // if (!accessToken) {
  //   // console.log(accessToken);
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex p-3 gap-3 h-screen overflow-hidden bg-black">
      <SideNav />
      <div className="flex-grow bg-[#161616] rounded-lg">{children}</div>
    </div>
  );
}
