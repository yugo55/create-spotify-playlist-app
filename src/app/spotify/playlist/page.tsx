"use client"

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { db } from "@/src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FaAngleLeft } from "react-icons/fa";
import { IconContext } from 'react-icons';
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const playlistId = searchParams.get("playlistId");
  const [playlistData, setPlaylistData] = useState<any>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (playlistId) {
        const docRef = doc(db, "playlists", playlistId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlaylistData(docSnap.data());;
        } else {
          console.log("ドキュメントが見つかりません。")
        }
      }
    };

    fetchPlaylistData();
  }, [playlistId]);
  
  return(
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <div className="h-full p-5 pt-0 pb-0 flex flex-col overflow-y-auto">
        {playlistData ? (
          <>
            <div className="flex items-center">
              <Link href={"/spotify"} className="hover:text-opacity-30 text-white">
                <FaAngleLeft size={30} />
              </Link>
              <h1 className="text-2xl font-bold pt-5 pb-4 ml-2 text-white sticky top-0 bg-[#161616]">{playlistData.name}</h1>
            </div>
            <p className="mb-6">作成日：{new Date(playlistData.createdAt.toMillis()).toLocaleDateString()}</p>
            <table className="text-white">
              <thead className="border-b-2 border-gray-400 text-[#878787]">
                <tr>
                  <th className="font-normal" scope="col" align="left">#</th>
                  <th className="font-normal" scope="col" align="left">タイトル</th>
                  <th className="font-normal" scope="col" align="left">アーティスト</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#515151]">
                {playlistData.tracks.map((track: any, index: number) => (
                  <tr key={index}>
                    <th className="pt-3 pb-3" scope="row">{index + 1}</th>
                    <td>{track.name}</td>
                    <td>{track.artist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-white">プレイリストのデータを取得中...</p>
        )}
      </div>
    </Suspense>
  );
}