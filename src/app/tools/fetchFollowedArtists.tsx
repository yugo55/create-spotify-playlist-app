// フォロー中のアーティスト情報を取得

import { setArtists } from "@/src/features/artist/artistSlice";

export default async function fetchFollowedArtists(dispatch: any) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("アクセストークンが見つかりません。");
      return;
    }

    // 取得できるフォロー中のアーティストは50まで。
    // 他のユーザーが使うことを考えたらもっと取得できるようにしないといけない。
    const response = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist&limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("アーティスト情報の取得に失敗しました。");
    }

    const followedArtists = await response.json();
    dispatch(setArtists(followedArtists.artists.items));
  } catch (error) {
    console.error("お気に入りアーティストの取得に失敗しました:", error);
  }
}
