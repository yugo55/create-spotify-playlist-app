// 不完全

export const useTokenRefresh = async() => {
  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    if (!storedRefreshToken || !clientId || !clientSecret) {
      console.error("Refresh token, client ID, or client secret not found");
      return;
    }

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`, // Basic認証を使用
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: storedRefreshToken,
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
      }

      // 1時間ごとにトークンをリフレッシュ
      setTimeout(refreshAccessToken, 3600 * 1000);
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  const tokenCheckInterval = setInterval(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      clearInterval(tokenCheckInterval);
      refreshAccessToken();
    }
  }, 1000);
};
