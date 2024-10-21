"use client"

import { useState, useEffect } from "react";
import { db } from "@/src/firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "playlists"), (snapshot) => {
      const fetchedPlaylists = snapshot.docs.map((doc) => doc.data());

      fetchedPlaylists.sort((a, b) => {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      })
      
      setPlaylists(fetchedPlaylists);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-2 overflow-y-auto place-items-center">
      {playlists.map((playlist, index) => (
        <li key={index} className="hover:bg-[#252525] inline-block p-2 rounded-xl mb-3 playlist-li">
        <Link href={`/spotify/playlist?playlistId=${playlist.playlistId}`} className="h-auto">
          <Image
            src={playlist.thumbnail}
            width={200}
            height={200}
            alt=""
            className="rounded-xl mb-3"
          />
          <p>{playlist.name}</p>
        </Link>
      </li>
      ))}
    </ul>
  );
}