"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useEffect, useState } from "react";
import fetchArtistAlbums from "@/src/app/tools/fetchArtistAlbums";
import fetchAlbumsTracks from "@/src/app/tools/fetchAlbumsTracks";
import { db } from "@/src/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

interface GeneratePlaylistPopupProps {
  onClose: () => void;
}

export default function GeneratePlaylistPopup({
  onClose,
}: GeneratePlaylistPopupProps) {
  const artists = useSelector((state: RootState) => state.artist.artists);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(30);
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);
  const [isPlaylistCreateError, setIsPlaylistCreateError] = useState<boolean>(false);
  const [randomTracks, setRandomTracks] = useState<any[]>([]);

  const handleCheckboxChange = (artistId: string) => {
    setSelectedArtistIds((prevSelected) =>
      prevSelected.includes(artistId)
        ? prevSelected.filter((id) => id !== artistId)
        : [...prevSelected, artistId]
    );
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  // Fisher-Yatesアルゴリズム
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleCreatePlaylist = async () => {
    setIsLoading(true);

    try {
      let fetchedAlbums: any[] = [];

      const albumsPromises = selectedArtistIds.map(async (id) => {
        const artistAlbums = await fetchArtistAlbums(id);
        return artistAlbums;
      });

      const resolvedAlbums = await Promise.all(albumsPromises);
      fetchedAlbums = resolvedAlbums.flat();

      const tracksData = await fetchAlbumsTracks(fetchedAlbums);

      const allTracks = Object.values(tracksData!).flat();
      const randomTracks = shuffleArray(allTracks).slice(0, selectedQuantity);

      setRandomTracks(randomTracks);
    } catch (error) {
      console.error("プレイリストの作成に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (randomTracks.length > 0) {
      console.log("randomTracksに楽曲が正常に挿入されました。");
      createSpotifyPlaylist(randomTracks);
    } else {
      console.log("randomTracksに楽曲が入っていません。");
    }
  }, [randomTracks]);

  const createSpotifyPlaylist = async (tracks: any[]) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("アクセストークンが見つかりません。");
      return;
    }

    try {
      const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userProfileResponse.ok) {
        throw new Error("ユーザープロファイルの取得に失敗しました。");
      }

      const userProfile = await userProfileResponse.json();
      const userId = userProfile.id;

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName || "ランダムプレイリスト",
            description: "自動生成されたプレイリスト",
            public: false,
          }),
        }
      );

      if (!playlistResponse.ok) {
        throw new Error("プレイリストの作成に失敗しました。");
      }

      const playlist = await playlistResponse.json();
      const playlistId = playlist.id;

      const trackUris = tracks.map((track) => track.uri);
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      });

      const selectedArtist = artists.find((artist) =>
        selectedArtistIds.includes(artist.id)
      );
      const thumbnail = selectedArtist ? selectedArtist.images[0].url : "";

      await setDoc(doc(db, "playlists", playlistId), {
        playlistId: playlistId,
        name: playlistName || "ランダムプレイリスト",
        tracks: tracks.map((track) => ({
          name: track.name,
          artist: track.artists[0].name,
        })),
        thumbnail: thumbnail,
        createdAt: Timestamp.now(),
      });

      setIsPlaylistCreated(true);
      setPlaylistName("");
      setTimeout(() => {
        setIsPlaylistCreated(false);
      }, 2000);
    } catch (error) {
      console.error("プレイリスト作成処理に失敗しました:", error);
      setIsPlaylistCreateError(true);
      setTimeout(() => {
        setIsPlaylistCreated(false);
      }, 3000);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-600 bg-opacity-30 fixed inset-0">
      <div className="fixed inset-14 m-auto bg-gray-300 p-5 rounded-md">
        <button
          className="block text-xl ml-auto hover:opacity-70"
          onClick={onClose}
        >
          ✖
        </button>
        <p className="text-black text-xl font-semibold">アーティスト</p>
        <ul className="flex flex-wrap">
          {artists.map((artist) => (
            <li key={artist.id} className="mx-2">
              <input
                type="checkbox"
                id={artist.id}
                name={artist.name}
                onChange={() => handleCheckboxChange(artist.id)}
                checked={selectedArtistIds.includes(artist.id)}
              />
              <label htmlFor={artist.id}>{artist.name}</label>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <label htmlFor="quantity">曲数: </label>
          <select
            name="quantity"
            id="quantity"
            value={selectedQuantity}
            onChange={handleQuantityChange}
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label htmlFor="name" className="ml-5">プレイリスト名: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={playlistName}
            onChange={handleNameChange}
          />
          <button
            className="block ml-auto text-xl font-semibold bg-green-500 py-1 w-20 rounded-full hover:opacity-70"
            onClick={handleCreatePlaylist}
          >
            作成
          </button>
        </div>
        {isLoading && (
          <div className="bg-black bg-opacity-60 inset-0 fixed grid place-items-center">
            <p className="text-center">プレイリストを作成中...</p>
          </div>
        )}
        {isPlaylistCreated && (
          <div className="bg-black bg-opacity-60 inset-0 fixed grid place-items-center">
            <p className="text-center text-green-400">
              プレイリストが正常に作成されました！！
            </p>
          </div>
        )}
        {isPlaylistCreateError && (
          <div className="bg-black bg-opacity-60 inset-0 fixed grid place-items-center">
            <p className="text-center text-red-400">
              プレイリストが作成できませんでした。リロードして再度お試しください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
