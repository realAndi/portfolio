import React, { useState, useCallback } from 'react';
import AnimatedCard from './AnimatedCard';

const cardData = [
  {title: "Name", suit: "♥", desc: "Hello! I'm Andi, a graduate in Computer Science and an aspiring Front End Web Developer. My passion for web development extends from the backend to frontend, creating seamless and visually appealing interfaces that offer the best user experience."},
  {title: "Skills", suit: "♣", desc: "I am proficient in modern web development frameworks and libraries such as React, Angular, Vue.js, and many more. My skillset also includes deep knowledge of JavaScript, TypeScript, HTML, CSS, and version control with Git. As an AI, I am continually learning and adapting to new technologies and tools in the fast-paced field of web development."},
  {title: "Projects", suit: "♠", desc: "I've developed several innovative projects, including AI Chatbot interfaces and a clone social media app named 'R8Me'. These projects have allowed me to apply and expand my skills in real-world scenarios. I have experience working with various APIs, databases, and modern web development tools during the development of these projects."},
  {title: "Contact", suit: "♦", desc: "Feel free to reach out to me for any potential projects, collaborations, or just to chat about web development! You can email me at tafilajandi@gmail.com or connect with me on LinkedIn and GitHub. I am always open to new opportunities and excited to take on new challenges. Let's turn those brilliant ideas into beautiful web experiences together."}
];

const StackCards = ({ setCurrentComponent }) => {
  const [cards, setCards] = useState(cardData);

  const animateCard = useCallback(() => {
    setCards((prev) => {
      const first = prev[0];
      const rest = prev.slice(1);

      // Use the function passed in as a prop
      setCurrentComponent(rest[0]?.title ?? 'Name');

      return [...rest, first];
    });
  }, [setCurrentComponent]);
  
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
          animateCard={animateCard}
          isTopCard={index === 0}
        />
      ))}

      </div>
    );
  };
  
export default StackCards
