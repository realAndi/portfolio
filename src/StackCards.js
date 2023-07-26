import React, { useState, useCallback, useEffect } from 'react';
import AnimatedCard from './AnimatedCard';

const cardData = [
  {title: "Name", suit: "♥", desc: ""},
  {title: "Skills", suit: "♣", desc: ""},
  {title: "Projects", suit: "♠", desc: ""},
  {title: "Contact", suit: "♦", desc: ""}
];

const StackCards = ({ setCurrentComponent }) => {
  const [cards, setCards] = useState(cardData);
  const [animation, setAnimation] = useState({ direction: 0, progress: 0 });

  const animateCard = useCallback(() => {
    setCards((prev) => {
      const first = prev[0];
      const rest = prev.slice(1);
      return [...rest, first];
    });
  }, []);

  useEffect(() => {
    setCurrentComponent(cards[0]?.title ?? "Name");
  }, [cards, setCurrentComponent]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37) {
        setAnimation({ direction: -5, progress: 0 });
      } else if (e.keyCode === 39) {
        setAnimation({ direction: 5, progress: 0 });
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let frameId;
    const animateSwipe = () => {
      setAnimation((prev) => {
        if (prev.progress >= 100) {
          animateCard();
          return { direction: 0, progress: 0 };
        } else {
          return { direction: prev.direction, progress: prev.progress + 10 };
        }
      });
      frameId = requestAnimationFrame(animateSwipe);
    };
    if (animation.direction !== 0) {
      frameId = requestAnimationFrame(animateSwipe);
    }
    return () => {
      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [animation, animateCard]);

  return (
    <div className="card-stack">
      {cards.map(({ title, suit, desc }, index) => (
        <AnimatedCard
          title={title}
          suit={suit}
          desc={desc}
          key={title}
          zIndex={cards.length - index}
          y={index * 20}
          x={index === 0 ? animation.progress * animation.direction : 0}
          animateCard={animateCard}
          isTopCard={index === 0}
        />
      ))}
    </div>
  );
};

export default StackCards;