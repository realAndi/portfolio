import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { NowPlayingSong } from '../../types/types';
import fetcher from '../../types/fetcher';
import { Link1Icon } from '@radix-ui/react-icons';
import BadWordsNext from 'bad-words-next'
import en from 'bad-words-next/data/en.json'

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
}

const SpotifyIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.247-.422.097-.863-.162-.953-.584-.09-.422.162-.863.584-.953 4.908-1.123 9.06-.661 12.452 1.391.371.241.49.721.241 1.101zm1.472-3.272c-.301.463-.923.611-1.386.322-3.462-2.133-8.731-2.751-12.829-1.511-.522.162-1.084-.12-1.246-.642-.162-.522.12-1.084.642-1.246 4.677-1.426 10.516-.721 14.489 1.69.45.301.611.923.322 1.386h.008zm.129-3.409c-4.15-2.469-11.019-2.697-14.97-1.492-.625.193-1.285-.162-1.477-.787-.193-.625.162-1.285.787-1.478 4.557-1.382 12.13-1.114 16.894 1.73.574.336.762 1.084.426 1.658-.336.574-1.084.762-1.658.426l-.002-.057z"/>
  </svg>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
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
      <div className="h-[140px] w-80 md:w-96 bg-background/80 backdrop-blur-sm shadow-lg rounded-lg p-4 flex items-center justify-center border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner />
          <p className="text-sm text-gray-600">Loading Spotify Data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-[140px] w-80 md:w-96 bg-background/80 backdrop-blur-sm shadow-lg rounded-lg p-4 flex items-center justify-center border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center gap-3 text-gray-600">
          <SpotifyIcon />
          <p className="text-sm">Not listening to anything</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 md:w-96 bg-background/80 backdrop-blur-sm shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      {data && (
        <>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-black/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={data.albumImageUrl} 
                alt="Album Art" 
                className="w-24 h-24 rounded shadow-md transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <SpotifyIcon />
                <span>{data.isPlaying ? 'Now playing' : 'Recently played'}</span>
              </div>
              <div className="space-y-1">
                <a 
                  href={data.songUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/link"
                >
                  <p className="text-lg font-bold truncate pr-8 group-hover/link:text-emerald-500 transition-colors">
                    {data.title ? badwords.filter(data.title) : '***'}
                  </p>
                  <p className="text-sm text-gray-600 truncate group-hover/link:text-gray-900 dark:group-hover/link:text-gray-300 transition-colors">
                    {data.artist ? badwords.filter(data.artist) : '***'}
                  </p>
                </a>
              </div>
              {data.isPlaying && (
                <div className="mt-3 space-y-1">
                  <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${(progress / data.durationMs) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{formatDuration(progress)}</span>
                    <span>{formatDuration(data.durationMs)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicCard

