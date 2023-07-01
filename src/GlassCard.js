import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

function GlassCard({ style, children }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0, config: { mass: 5, tension: 350, friction: 40 } }));

  const bind = useGesture({
    onMove: ({ xy: [px, py] }) => {
      const x = (px - window.innerWidth / 2) / 10;
      const y = (window.innerHeight / 2 - py) / 10;
      set({ x, y });
    },
    onHover: ({ hovering }) => !hovering && set({ x: 0, y: 0 }),
  });

  return (
    <animated.div
      {...bind()}
      className="glass-card"
      style={{
        ...style,
        transform: x.to(x => `perspective(600px) rotateY(${x}deg)`).to(y => `rotateX(${y}deg)`),
      }}
    >
      {children}
    </animated.div>
  );
}

export default GlassCard;
