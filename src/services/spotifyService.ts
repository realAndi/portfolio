import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Debug logging
console.log('Spotify Credentials Check:', {
  hasClientId: !!client_id,
  hasClientSecret: !!client_secret,
  hasRefreshToken: !!refresh_token,
  refreshToken: refresh_token?.substring(0, 5) + '...' // Only log first 5 chars for security
});

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing required Spotify credentials');
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  });

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to get access token');
    }

    return response.json();
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();
    
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!response.ok && response.status !== 204) {
      throw new Error('Failed to fetch now playing');
    }

    return response;
  } catch (error) {
    console.error('Error fetching now playing:', error);
    throw error;
  }
};

export const getRecentlyPlayed = async () => {
  try {
    const { access_token } = await getAccessToken();
    
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recently played');
    }

    return response;
  } catch (error) {
    console.error('Error fetching recently played:', error);
    throw error;
  }
};
