import { type NextRequest } from 'next/server';
import { getNowPlaying } from '../../../services/spotifyService';

interface Artist {
  name: string;
}

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      });
    }

    const song = await response.json();

    if (!song || song.item === null) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: Artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const progressMs = song.progress_ms;
    const durationMs = song.item.duration_ms;
    const timestamp = song.timestamp;

    return new Response(
      JSON.stringify({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        progressMs,
        durationMs,
        timestamp
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      }
    );
  } catch (error) {
    console.error('Error in Spotify API handler:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch Spotify data',
        isPlaying: false 
      }),
      {
        status: 200,  // We still return 200 to not break the UI
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
}