import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

function AnimatedCard({ title, zIndex, y, animateCard, isTopCard }) {
    const [{ x }, set] = useSpring(() => ({ x: 0, config: { tension: 300, friction: 30 } }));
    const [swiped, setSwiped] = useState(false);
    const [lastDirection, setLastDirection] = useState(0);

    const bind = useGesture({
        onDrag: ({ down, movement: [mx], vxvy: [vx] }) => {
            let direction = Math.sign(mx);
            if (direction !== lastDirection) {
                setSwiped(false);
                setLastDirection(direction);
            }
  
            if (Math.abs(mx) > 100 || Math.abs(vx) > 3) {
                setSwiped(true);
            }
  
            let movedX = down ? mx : 0;
            set({ x: movedX, immediate: down });
        },
        onDragEnd: ({ movement: [mx] }) => {
            if ((Math.abs(mx) > 100) && swiped) { 
                animateCard();
                set({ x: 0 });
                setSwiped(false);
            } else {
                set({ x: 0 });
            }
        },
    }, { rubberbandIfOutOfBounds: true });

    return (
        <animated.div
            {...(isTopCard ? bind() : {})}
            className="glass-card"
            style={{
                zIndex: zIndex,
                transform: x.to(x => `translate3d(${x}px, ${y}px, 0) rotateZ(${x / window.innerWidth * 45}deg)`),
            }}
        >
            <h1>{title}</h1>
            <p>This is a card about {title}</p>
        </animated.div>
    );
}

  
    
export default AnimatedCard;
