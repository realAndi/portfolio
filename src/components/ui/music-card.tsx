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
          return currentData.durationMs; // Cap the progress at the song's duration
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentData]);

  const data = currentData?.isPlaying ? currentData : recentData;
  const isLoading = currentValidating || (shouldFetchRecent && recentValidating);

  if (isLoading) {
    return <div className="h-[125px] w-80 md:w-96 bg-background shadow-lg rounded-lg p-4 flex items-center justify-center">
      <p className="text-lg text-gray-600">Loading Spotify Data...</p>
    </div>;
  }

  if (!data) {
    return <div className="h-[125px] w-80 md:w-96 bg-background shadow-lg rounded-lg p-4 flex items-center justify-center">
      <p className="text-lg text-gray-600">Not listening to anything</p>
    </div>;
  }

  return (
    <div className="w-80 md:w-96 bg-background shadow-lg rounded-lg p-4 flex items-center">
      {data && (
        <>
          <div className="flex-shrink-0 ">
            <div className="text-foreground text-xs mb-2">
              {data.isPlaying ? 'Andi is now listening to...' : 'Andi just listened to...'}
            </div>
            <img src={data.albumImageUrl} alt="Album Art" className="w-24 h-24 rounded" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold truncate">{badwords.filter(data.title)}</p>
                <p className="text-sm text-gray-600 truncate">{badwords.filter(data.artist)}</p>
              </div>
              <a href={data.songUrl} target="_blank" rel="noopener noreferrer" className="ml-2 p-1">
                <Link1Icon />
              </a>
            </div>
            {data.isPlaying && (
              <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-foreground h-2.5 rounded-full" style={{ width: `${(progress / data.durationMs) * 100}%` }}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {formatDuration(progress)} / {formatDuration(data.durationMs)}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MusicCard

