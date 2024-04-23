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