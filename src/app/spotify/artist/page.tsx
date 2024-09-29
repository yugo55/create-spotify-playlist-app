"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<{ [key: string]: any[] }>({});
  const [artistName, setArtistName] = useState<string>("");
  const [visibleTracks, setVisibleTracks] = useState<{
    [key: string]: boolean;
  }>({});
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artistId");

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.error("アクセストークンが見つかりません");
          return;
        }

        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("アーティスト情報の取得に失敗しました。");
        }

        const artist = await response.json();
        setArtistName(artist.name);
      } catch (error) {
        console.error("アーティスト情報の取得に失敗しました:", error);
      }
    };

    const fetchArtistAlbums = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.error("アクセストークンが見つかりません。");
          return;
        }

        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("楽曲情報の取得に失敗しました。");
        }

        const albums = await response.json();
        setAlbums(albums.items);

        const initialVisibility: { [key: string]: boolean } = {};
        const albumIdsArray: Array<string> = []
        albums.items.forEach((album: any) => {
          initialVisibility[album.id] = true;
          albumIdsArray.push(album.id)
        });
        fetchAlbumTracks(albumIdsArray);
        setVisibleTracks(initialVisibility);
      } catch (error) {
        console.error("楽曲の取得に失敗しました:", error);
      }
    };

    if (artistId) {
      fetchArtistInfo();
      fetchArtistAlbums();
    }
  }, [artistId]);

  const fetchAlbumTracks = async (albumIdsArray: string[]) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("アクセストークンが見つかりません。");
        return;
      }

      const chunkedAlbumIds = [];
      for (let i = 0; i < albumIdsArray.length; i += 20) {
        chunkedAlbumIds.push(albumIdsArray.slice(i, i + 20));
      }

      const requests = chunkedAlbumIds.map((chunk) => {
        const ids = chunk.join(",");
        return fetch(`https://api.spotify.com/v1/albums?ids=${ids}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },  
        });
      });

      const responses = await Promise.all(requests);

      const newTracks: { [key: string]: any[] } = {};
      
      for (const response of responses) {
        if (!response.ok) {
          throw new Error("楽曲情報の取得に失敗しました。");
        }

        const trackData = await response.json();
        trackData.albums.forEach((album: any) => {
          newTracks[album.id] = album.tracks.items;
        });
      }

      setTracks((prevTracks) => ({
        ...prevTracks,
        ...newTracks,
      }));
    } catch (error) {
      console.error(`楽曲の取得に失敗しました:`, error);
    }
  };

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
