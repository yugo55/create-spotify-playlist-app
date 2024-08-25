import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { code, codeVerifier } = await req.json();

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:3000/spotify/callback',
    code_verifier: codeVerifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: params.toString(),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
