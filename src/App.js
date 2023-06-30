import React from 'react';
import './App.css';
import { useSpring, animated } from 'react-spring';

function App() {
  const props1 = useSpring({opacity: 1,  transform: 'translate3d(0,-50px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 100});
  const props2 = useSpring({opacity: 1,  transform: 'translate3d(0,-100px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 200});
  const props3 = useSpring({opacity: 1,  transform: 'translate3d(0,-150px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 300});
  const props4 = useSpring({opacity: 1,  transform: 'translate3d(0,-200px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 400});

  return (
    <div className="card-container">
      <animated.div className="glass-card" style={props1}>
        <div className="card-suite">♥</div>
        <h1>Card 1</h1>
        <h2>My Sub-Header</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis mollis nulla. Vestibulum tempus lacus sit amet velit mollis egestas.</p>
      </animated.div>

      <animated.div className="glass-card" style={props2}>
        <div className="card-suite">♦</div>
        <h1>Card 2</h1>
        <h2>My Sub-Header</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis mollis nulla. Vestibulum tempus lacus sit amet velit mollis egestas.</p>
      </animated.div>

      <animated.div className="glass-card" style={props3}>
        <div className="card-suite">♣</div>
        <h1>Card 3</h1>
        <h2>My Sub-Header</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis mollis nulla. Vestibulum tempus lacus sit amet velit mollis egestas.</p>
      </animated.div>

      <animated.div className="glass-card" style={props4}>
        <div className="card-suite">♠</div>
        <h1>Card 4</h1>
        <h2>My Sub-Header</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis mollis nulla. Vestibulum tempus lacus sit amet velit mollis egestas.</p>
      </animated.div>
    </div>
  );
}

export default App;
