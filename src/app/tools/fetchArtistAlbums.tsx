import React, { SetStateAction } from "react";

export default async function fetchArtistAlbums(artistId: string, setAlbums?: React.Dispatch<SetStateAction<any[]>>) {
  try {
    // アクセストークンの取得は引数で渡したほうがいいかも
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
    if (setAlbums) {
      setAlbums(albums.items);
    } else {
      return albums.items
    }
  } catch (error) {
    console.error("楽曲の取得に失敗しました:", error);
  }
};
