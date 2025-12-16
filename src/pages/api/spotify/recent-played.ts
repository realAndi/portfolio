import { type NextRequest } from 'next/server';
import { getRecentlyPlayed } from '../../../services/spotifyService'; 

interface Artist {
  name: string;
}

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  const response = await getRecentlyPlayed(); 

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const song = await response.json();

  if (!song.items || song.items.length === 0) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const recentSong = song.items[0].track;

  const isPlaying = false;
  const title = recentSong.name;
  const artist = recentSong.artists.map((_artist: Artist) => _artist.name).join(', ');
  const album = recentSong.album.name;
  const albumImageUrl = recentSong.album.images[0].url;
  const songUrl = recentSong.external_urls.spotify;
  const progressMs = 0; // No progress since it's not currently playing
  const durationMs = recentSong.duration_ms;
  const timestamp = 0; // No specific timestamp needed for recent plays

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
}