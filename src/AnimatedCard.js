import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

function AnimatedCard({ title, suit, desc, zIndex, y, x: propX, animateCard, isTopCard }) {
    const [{ x }, set] = useSpring(() => ({ x: 0, config: { tension: 300, friction: 30 } }));
    const [swiped, setSwiped] = useState(false);
    const [lastDirection, setLastDirection] = useState(0);

    useEffect(() => {
        set({ x: propX });
    }, [propX, set]);
    
    function preventBodyScroll(prevent) {
        document.body.style.overflow = prevent ? 'hidden' : '';
    }

    const bind = useGesture({
        onDragStart: () => {
            preventBodyScroll(true);
        },
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
            preventBodyScroll(false);
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
            <div className="card-header">
                <h1 classNAme="titleHeader">{title}</h1>
                <h1 className="card-suit">{suit}</h1>
            </div>
            <p>{desc}</p>
        </animated.div>
    );
}

export default AnimatedCard;
