"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useState } from "react";

interface GeneratePlaylistPopupProps {
  onClose: () => void;
}

export default function GeneratePlaylistPopup({
  onClose,
}: GeneratePlaylistPopupProps) {
  const artists = useSelector((state: RootState) => state.artist.artists);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);

  const handleCheckboxChange = (artistId: string) => {
    setSelectedArtistIds((prevSelected) =>
      prevSelected.includes(artistId)
        ? prevSelected.filter((id) => id !== artistId)
        : [...prevSelected, artistId]
    );
  };

  const handleCreatePlaylist = () => {
    console.log(`選択されたアーティストのID: ${selectedArtistIds}`);
    // id取得→Get Artist's Albumsでそれぞれのアーティストの全アルバムを取得→全てのアルバムから全ての楽曲を取得→楽曲をランダムに選定→プレイリスト作成
    
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
        <button
          className="block ml-auto text-xl font-semibold bg-green-500 py-1 w-20 rounded-full hover:opacity-70"
          onClick={handleCreatePlaylist}
        >
          作成
        </button>
      </div>
    </div>
  );
}
