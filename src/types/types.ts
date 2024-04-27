export interface CardData {
    title: string;
    suit: string;
    desc: string;
  }
  
  export interface AnimatedCardProps {
    title: string;
    suit: string;
    desc: string;
    zIndex: number;
    y: number;
    x: number;
    animateCard: () => void;
    isTopCard: boolean;
  }

  export type NowPlayingSong = {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
    progressMs: number;
    durationMs: number;
    timestamp: string;
  };

