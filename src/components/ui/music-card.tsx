import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { NowPlayingSong } from '../../types/types';
import fetcher from '../../types/fetcher';
import BadWordsNext from 'bad-words-next'
import en from 'bad-words-next/data/en.json'

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
}

const SpotifyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.247-.422.097-.863-.162-.953-.584-.09-.422.162-.863.584-.953 4.908-1.123 9.06-.661 12.452 1.391.371.241.49.721.241 1.101zm1.472-3.272c-.301.463-.923.611-1.386.322-3.462-2.133-8.731-2.751-12.829-1.511-.522.162-1.084-.12-1.246-.642-.162-.522.12-1.084.642-1.246 4.677-1.426 10.516-.721 14.489 1.69.45.301.611.923.322 1.386h.008zm.129-3.409c-4.15-2.469-11.019-2.697-14.97-1.492-.625.193-1.285-.162-1.477-.787-.193-.625.162-1.285.787-1.478 4.557-1.382 12.13-1.114 16.894 1.73.574.336.762 1.084.426 1.658-.336.574-1.084.762-1.658.426l-.002-.057z"/>
  </svg>
);

const VinylDisc = ({ isPlaying, albumArt }: { isPlaying: boolean; albumArt?: string }) => (
  <div className="relative w-16 h-16 flex-shrink-0">
    {/* Vinyl base */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-lg ${isPlaying ? 'animate-spin' : ''}`}
      style={{ animationDuration: '3s' }}
    >
      {/* Vinyl grooves */}
      <div className="absolute inset-1 rounded-full border border-neutral-700/30" />
      <div className="absolute inset-2 rounded-full border border-neutral-700/20" />
      <div className="absolute inset-3 rounded-full border border-neutral-700/30" />
      <div className="absolute inset-4 rounded-full border border-neutral-700/20" />

      {/* Center label with album art */}
      <div className="absolute inset-[22%] rounded-full overflow-hidden bg-primary/20 border border-primary/30">
        {albumArt && (
          <img
            src={albumArt}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Center hole */}
      <div className="absolute inset-[45%] rounded-full bg-background border border-border" />
    </div>

    {/* Shine effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
  </div>
);

const MusicCard = () => {
  const { data: currentData, error: currentError, isValidating: currentValidating } = useSWR<NowPlayingSong>('/api/spotify/current-playback', fetcher);
  const [shouldFetchRecent, setShouldFetchRecent] = useState(false);
  const { data: recentData, error: recentError, isValidating: recentValidating } = useSWR<NowPlayingSong>(shouldFetchRecent ? '/api/spotify/recent-played' : null, fetcher);
  const [progress, setProgress] = useState(0);
  const badwords = new BadWordsNext({ data: en })

  useEffect(() => {
    if (currentData) {
      if (currentData.isPlaying) {
        setProgress(currentData.progressMs);
        setShouldFetchRecent(false);
      } else {
        setShouldFetchRecent(true);
      }
    } else if (currentError || !currentValidating) {
      setShouldFetchRecent(true);
    }
  }, [currentData, currentError, currentValidating]);

  useEffect(() => {
    if (!currentData || !currentData.isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1000;
        if (newProgress >= currentData.durationMs) {
          clearInterval(interval);
          return currentData.durationMs;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentData]);

  const data = currentData?.isPlaying ? currentData : recentData;
  const isLoading = currentValidating || (shouldFetchRecent && recentValidating);

  if (isLoading) {
    return (
      <div className="w-72 bg-background/60 backdrop-blur-md border border-border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-2 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-72 bg-background/60 backdrop-blur-md border border-border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <VinylDisc isPlaying={false} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">
              <SpotifyIcon />
              <span>Offline</span>
            </div>
            <p className="text-sm text-muted-foreground">Not listening</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 glass rounded-xl p-4 transition-all duration-300 hover:border-primary/30 shadow-depth-sm hover:shadow-depth-md group touch-feedback">
      <div className="flex items-center gap-4">
        <VinylDisc isPlaying={data.isPlaying} albumArt={data.albumImageUrl} />

        <div className="flex-1 min-w-0">
          {/* Status indicator */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">
            <SpotifyIcon />
            <span>{data.isPlaying ? 'Now spinning' : 'Last played'}</span>
            {data.isPlaying && (
              <span className="flex gap-0.5 ml-1">
                <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </div>

          {/* Track info */}
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {data.title ? badwords.filter(data.title) : '***'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {data.artist ? badwords.filter(data.artist) : '***'}
            </p>
          </a>

          {/* Progress bar */}
          {data.isPlaying && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-0.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/60 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(progress / data.durationMs) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {formatDuration(progress)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicCard
