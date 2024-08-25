'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SpotifyCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')!;
        const codeVerifier = localStorage.getItem('code_verifier');

        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.SPOTIFY_CLIENT_ID!,
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:3000/spotify/callback',
            code_verifier: codeVerifier!,
          }),
        };

        const response = await fetch('/api/spotify/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, codeVerifier }),
        });
        const data = await response.json();

        localStorage.setItem('access_token', data.access_token);

        // アクセストークンを取得した後、Spotifyページにリダイレクト
        router.push('/spotify');
      } catch (error) {
        console.error('Failed to get access token:', error);
      }
    };

    getAccessToken();
  }, [router]);

  return <div>Processing Spotify callback...</div>;
};

export default SpotifyCallback;
