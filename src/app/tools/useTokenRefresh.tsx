import { useEffect } from "react";

export const useTokenRefresh = () => {
  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    if (!storedRefreshToken || !clientId || !clientSecret) {
      console.error("Refresh Token, client ID, or client secret not found");
      return;
    }

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: storedRefreshToken!,
      }),
    };

    try {
      const response = await fetch(url, payload);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error status:", response.status);
        console.error("Error details:", errorText);
        return;
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log("リフレッシュトークンが正常にセットされました。");
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 3600 * 1000);

    return () => clearInterval(intervalId);
  }, []);
};
