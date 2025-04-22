import { type NextRequest } from 'next/server';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3002/api/spotify/callback';
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state'
].join(' ');

export const config = {
  runtime: 'edge'
};

export default function handler(req: NextRequest) {
  const authUrl = new URL(SPOTIFY_AUTH_URL);
  authUrl.searchParams.append('client_id', client_id || '');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirect_uri);
  authUrl.searchParams.append('scope', scopes);

  return new Response(JSON.stringify({ url: authUrl.toString() }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  });
} 