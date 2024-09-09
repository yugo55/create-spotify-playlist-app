"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTokenRefresh } from "@/app/tools/useTokenRefresh";

export default function SideNav() {
  const [favoriteArtists, setFavoriteArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteArtists = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("アクセストークンが見つかりません。");
          return;
        }

        const response = await fetch("https://api.spotify.com/v1/me/following?type=artist", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("アーティスト情報の取得に失敗しました。");
        }

        const data = await response.json();
        setFavoriteArtists(data.artists.items);
      } catch (error) {
        console.error("お気に入りアーティストの取得に失敗しました:", error);
      }
    };

    const intervalId = setInterval(() => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (accessToken && refreshToken) {
        clearInterval(intervalId);
        useTokenRefresh();
        fetchFavoriteArtists();
      }
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className="flex flex-col justify-between h-full gap-3 w-96">
      <div className="w-full p-5 rounded-lg bg-[#161616]">
        <Link href="/spotify" className="block text-white font-semibold text-2xl ml-2 pb-2 border-b-2 border-[#484848] hover:opacity-70"><span className="text-green-500">Spotify</span> API</Link>
        <Link href="/spotify/analysis" className="text-gray-400 block ml-2 mt-2 font-semibold text-xl hover:opacity-70">分析</Link>
      </div>
      <div className="bg-[#161616] p-5 rounded-lg flex-grow overflow-y-auto">
        <p className="text-gray-400 font-semibold mb-2 ml-2">お気に入りアーティスト</p>
        <ul>
          {favoriteArtists.map(artist => (
            <li key={artist.id}>
              <Link href={`/spotify/artist?artistId=${artist.id}`} className="flex items-center hover:bg-[#282828] p-2 rounded-lg">
                <Image src={artist.images[0]?.url} width={50} height={50} alt="" className="rounded-full" />
                <p className="ml-3">{artist.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#161616] p-5 rounded-lg">
        <p className="ml-2">Log out</p>
      </div>
    </div>
  );
}