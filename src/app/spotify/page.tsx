"use client";

import { useEffect, useState } from "react";
import GeneratePlaylistPopup from "@/src/app/ui/generatePlaylistPopup";
import { useRouter } from "next/navigation";
import Playlists from "@/src/app/ui/playlists";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

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
