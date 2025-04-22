import { type NextRequest } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3002/api/spotify/callback';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  if (!code) {
    return new Response(JSON.stringify({ error: 'No code provided' }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get tokens');
    }

    // Return the refresh token and other data
    return new Response(
      JSON.stringify({
        message: 'Authentication successful! Here is your refresh token:',
        refresh_token: data.refresh_token,
        // Also return other useful data
        access_token: data.access_token,
        token_type: data.token_type,
        scope: data.scope,
        expires_in: data.expires_in
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in callback:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to authenticate with Spotify' }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
} 