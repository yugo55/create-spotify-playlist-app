"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import fetchFollowedArtists from "@/src/app/tools/fetchFollowedArtists";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SideNav() {
  const followedArtists = useSelector((state: RootState) => state.artist.artists);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem("access_token")) {
        const token = localStorage.getItem("access_token");
        setAccessToken(token);
        clearInterval(interval);
      } else {
        console.log("アクセストークンが見つかりません。");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchArtists = async () => {
      if (accessToken) {
        await fetchFollowedArtists(dispatch);
        setIsLoading(false);
      }
    };
    
    fetchArtists();
  }, [accessToken, dispatch]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
  
  return (
    <div className="flex flex-col justify-between h-full gap-3 w-96">
      <div className="w-full p-5 rounded-lg bg-[#161616]">
        <Link
          href="/spotify"
          className="block text-white font-semibold text-2xl ml-2 pb-2 border-b-2 border-[#484848] hover:opacity-70"
        >
          <span className="text-green-500">Spotify</span> API
        </Link>
        <Link
          href="/spotify/analysis"
          className="text-gray-400 block ml-2 mt-2 font-semibold text-xl hover:opacity-70"
        >
          分析
        </Link>
      </div>
      <div className="bg-[#161616] p-5 rounded-lg flex-grow overflow-y-auto">
        <p className="text-gray-400 font-semibold mb-2 ml-2">
          お気に入りアーティスト
        </p>
        <ul>
          {followedArtists.map((artist) => (
            <li key={artist.id}>
              <Link
                href={`/spotify/artist?artistId=${artist.id}`}
                className="flex items-center hover:bg-[#282828] p-2 rounded-lg"
              >
                <Image
                  src={artist.images[0]?.url}
                  width={50}
                  height={50}
                  alt=""
                  className="rounded-full"
                />
                <p className="ml-3">{artist.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button className="ml-2 text-white bg-[#161616] block p-5 text-left rounded-lg" onClick={handleLogout}>Log out</button>
    </div>
  );
}
