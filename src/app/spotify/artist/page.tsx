"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import fetchArtistAlbums from "@/src/app/tools/fetchArtistAlbums";
import fetchAlbumsTracks from "@/src/app/tools/fetchAlbumsTracks";

export default function Page() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<{ [key: string]: any[] }>({});
  const [artistName, setArtistName] = useState<string>("");
  const [visibleTracks, setVisibleTracks] = useState<{
    [key: string]: boolean;
  }>({});
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artistId")!;

  useEffect(() => {
    if (artistId) {
      fetchArtistAlbums(artistId, setAlbums);
    }
  }, [artistId]);
  
  useEffect(() => {
    if (albums.length > 0) {
      fetchAlbumsTracks(albums, setTracks);

      const initialVisibility = albums.reduce((acc, album) => {
        acc[album.id] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setVisibleTracks(initialVisibility);
    }
  }, [albums]);

  const toggleTracksVisibility = async (albumId: string) => {
    setVisibleTracks((prevVisibleTracks) => ({
      ...prevVisibleTracks,
      [albumId]: !prevVisibleTracks[albumId],
    }));
  };

  return (
    <div className="h-full p-5 pb-0 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-white">{artistName}</h1>
      <ul className="overflow-y-auto">
        {albums.map((album) => (
          <li key={album.id} className="mb-4 items-center">
            <div className="flex">
              <img
                src={album.images[0]?.url}
                alt=""
                className="rounded-lg w-12 h-12"
              />
              <div className="ml-3 flex items-center">
                <p className="font-semibold">{album.name}</p>
                <button
                  onClick={() => toggleTracksVisibility(album.id)}
                  className="mb-2 px-4 py-2 text-white text-3xl hover:text-opacity-70"
                >
                  {visibleTracks[album.id]
                    ? "-"
                    : "+"}
                </button>
              </div>
            </div>
            {visibleTracks[album.id] && tracks[album.id] && (
              <ul className="pl-6">
                {tracks[album.id].map((track) => (
                  <li key={track.id} className="mb-2 text-white">
                    {track.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
