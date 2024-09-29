// フォロー中のアーティスト情報を取得

import { useDispatch } from "react-redux";
import { setArtists } from "@/src/features/artist/artistSlice";

export default async function getFollowedArtists() {
  const dispatch = useDispatch();

  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("アクセストークンが見つかりません。");
      return;
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("アーティスト情報の取得に失敗しました。");
    }

    const followedArtistsData = await response.json();
    dispatch(setArtists(followedArtistsData.artists.items));
  } catch (error) {
    console.error("お気に入りアーティストの取得に失敗しました:", error);
  }
}
