'use client';

import { useState } from 'react';

export default function Page() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/spotify/auth');
      const data = await response.json();
      
      // authUrlとcodeVerifierを取得
      const { authUrl, codeVerifier } = data;
      
      // codeVerifierをlocalStorageに保存
      window.localStorage.setItem('code_verifier', codeVerifier);
      
      // 認証URLにリダイレクト
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error during Spotify login:', error);
    }
  };
  
  return (
    <main className="h-screen grid place-items-center bg-[#202020]">
      <div>
        <h1 className="text-7xl text-white font-bold mb-20"><span className="text-green-500">Spotify</span> API</h1>
        <button onClick={handleLogin} className="grid place-items-center w-28 h-11 rounded-full bg-green-500 font-semibold mx-auto">
          Log in
        </button>
      </div>
    </main>
  );
}
