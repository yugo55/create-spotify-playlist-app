"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokenRefresh } from "@/src/app/tools/useTokenRefresh";

const SpotifyCallback = () => {
  const router = useRouter();

  useTokenRefresh();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code")!;
        const codeVerifier = localStorage.getItem("code_verifier");

        if (!codeVerifier) {
          throw new Error("Code verifier not found.");
        }

        const payload = new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
          grant_type: "authorization_code",
          code,
          redirect_uri: "http://localhost:3000/spotify/callback",
          code_verifier: codeVerifier,
        });

        const response = await fetch("/api/spotify/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            codeVerifier,
            payload: payload.toString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token.");
        }

        const data = await response.json();

        localStorage.setItem("access_token", data.access_token),
          localStorage.setItem("refresh_token", data.refresh_token),
          console.log(
            `アクセストークン：${localStorage.getItem("access_token")}`
          );
        console.log(
          `リフレッシュトークン：${localStorage.getItem("refresh_token")}`
        );

        // すべての処理が完了した後、Spotifyページにリダイレクト
        if (
          localStorage.getItem("access_token") &&
          localStorage.getItem("refresh_token")
        ) {
          router.push("/spotify");
        } else {
          alert(
            "アクセストークン、またはリフレッシュトークンの取得に失敗しました"
          );
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    };

    getAccessToken();
  }, [router]);

  return <div>Processing Spotify callback...</div>;
};

export default SpotifyCallback;
