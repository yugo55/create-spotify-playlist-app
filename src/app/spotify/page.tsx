"use client";

import { useEffect, useState } from "react";
import GeneratePlaylistPopup from "@/src/app/ui/generatePlaylistPopup";
import { useRouter } from "next/navigation";
import Playlists from "@/src/app/ui/playlists";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  //　ユーザー情報の取得。必要ないかも
  // useEffect(() => {
  //   console.log("実行");
  //   const fetchUserData = async () => {
  //     const accessToken = localStorage.getItem("access_token");
  //     if (!accessToken) {
  //       console.error("No access token found");
  //       return;
  //     }

  //     const response = await fetch("https://api.spotify.com/v1/me", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (response.status === 401) {
  //       alert("ログインタイムアウト：再度ログインしてください。");
  //       router.push("/");
  //     }
      
  //     const data = await response.json();
  //     setUserData(data);
  //   };

  //   fetchUserData();
  // }, []);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="h-full p-5 pb-0 flex flex-col">
      <div className="flex justify-between px-2 items-center">
        <p className="font-semibold text-xl">マイプレイリスト</p>
        <button
          className="block text-black text-4xl bg-green-500 w-20 rounded-full hover:opacity-70"
          onClick={togglePopup}
        >
          +
        </button>
        {isPopupVisible && <GeneratePlaylistPopup onClose={togglePopup} />}
      </div>
      <Playlists />
    </div>
  );
}
