import React, { SetStateAction } from "react";

export default async function fetchAlbumsTracks(albums: any[], setTracks?: React.Dispatch<SetStateAction<{ [key: string]: any[]; }>>) {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("アクセストークンが見つかりません。");
      return;
    }

    const albumIdsArray = albums.map((album) => album.id);
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
        throw new Error("楽曲の取得に失敗しました。");
      }

      const trackData = await response.json();
      trackData.albums.forEach((album: any) => {
        newTracks[album.id] = album.tracks.items;
      });
    }

    if (setTracks) {
      setTracks((prevTracks) => ({
        ...prevTracks,
        ...newTracks,
      }));
    } else {
      return newTracks
    }
  } catch (error) {
    console.error("楽曲の取得に失敗しました:", error);
  }
};
