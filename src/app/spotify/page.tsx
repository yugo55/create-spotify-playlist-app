"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GeneratePlaylistPopup from "@/src/app/ui/generatePlaylistPopup";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        alert("ログインタイムアウト：再度ログインしてください。");
        router.push("/");
      }
      
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] h-full mt-2 overflow-y-auto">
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
        <li className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3">
          <Link href="" className="h-auto">
            <Image
              src="/ANTENNA.jpeg"
              width={200}
              height={200}
              alt=""
              className="rounded-xl mb-3"
            />
            <p>プレイリスト名</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
