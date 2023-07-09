import React, { useState, useCallback } from 'react';
import AnimatedCard from './AnimatedCard';

const cardData = ["Name", "Skills", "Projects", "Contact"];

const StackCards = () => {
    const [cards, setCards] = useState(cardData);
    const animateCard = useCallback(() => {
      setCards((prev) => {
        const first = prev[0];
        const rest = prev.slice(1);
        return [...rest, first];
      });
    }, []);
  
    return (
      <div className="card-stack">
        {cards.map((title, index) => (
          <AnimatedCard
            title={title}
            key={title}
            zIndex={cards.length - index}
            y={index * 20}
            animateCard={animateCard}
            isTopCard={index === 0}
          />
        ))}
      </div>
    );
  };
  
export default StackCards
