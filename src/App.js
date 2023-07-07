import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import onImage from './pics/on.png';
import offImage from './pics/off.png';
import './App.css'

function App() {
  const [isOn, setIsOn] = useState(false);

  const nameProps = useSpring({opacity: isOn ? 1 : 0, from: {opacity: 0}, delay: 300});

  const handleClick = () => {
    setIsOn(true);
  };

  return (
    <div className="App">
      <div className="light-switch" onClick={handleClick}>
        <img src={isOn ? onImage : offImage} alt="light switch" />
      </div>

      <animated.div className="sign" style={nameProps}>
        <span> andi </span>
        <span> tafilaj </span>
      </animated.div>

      {/* Rest of your App here */}
    </div>
  );
}

export default App;
