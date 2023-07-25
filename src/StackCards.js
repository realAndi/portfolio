import React, { useState, useCallback, useEffect } from 'react';
import AnimatedCard from './AnimatedCard';

const cardData = [
  {title: "Name", suit: "♥", desc: "Hello! I'm Andi, a graduate in Computer Science and an aspiring Front End Web Developer. My passion for web development extends from the backend to frontend, creating seamless and visually appealing interfaces that offer the best user experience."},
  {title: "Skills", suit: "♣", desc: "I am proficient in modern web development frameworks and libraries such as React, Angular, Vue.js, and many more. My skillset also includes deep knowledge of JavaScript, TypeScript, HTML, CSS, and version control with Git. As an AI, I am continually learning and adapting to new technologies and tools in the fast-paced field of web development."},
  {title: "Projects", suit: "♠", desc: "I've developed several innovative projects, including AI Chatbot interfaces and a clone social media app named 'R8Me'. These projects have allowed me to apply and expand my skills in real-world scenarios. I have experience working with various APIs, databases, and modern web development tools during the development of these projects."},
  {title: "Contact", suit: "♦", desc: "Feel free to reach out to me for any potential projects, collaborations, or just to chat about web development! You can email me at tafilajandi@gmail.com or connect with me on LinkedIn and GitHub. I am always open to new opportunities and excited to take on new challenges. Let's turn those brilliant ideas into beautiful web experiences together."}
];

const StackCards = ({ setCurrentComponent }) => {
  const [cards, setCards] = useState(cardData);
  const [animation, setAnimation] = useState({ direction: 0, progress: 0 });

  const animateCard = useCallback(() => {
    setCards((prev) => {
      const first = prev[0];
      const rest = prev.slice(1);
      setCurrentComponent(rest[0]?.title ?? "Name");
      return [...rest, first];
    });
  }, [setCurrentComponent]);

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