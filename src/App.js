import React from 'react';
import './App.css';
import { useSpring } from 'react-spring';
import GlassCard from './GlassCard';

function App() {

  const props1 = useSpring({opacity: 1,  transform: 'translate3d(0,-200px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 100});
  const props2 = useSpring({opacity: 1,  transform: 'translate3d(0,-150px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 200});
  const props3 = useSpring({opacity: 1,  transform: 'translate3d(0,-100px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 300});
  const props4 = useSpring({opacity: 1,  transform: 'translate3d(0,-50px,0)', from: {opacity: 0, transform: 'translate3d(0,150px,0)'}, delay: 400});

  return (
    <div className="card-container">
      <GlassCard style={props1}>
        <div className="card-suite">♥</div>
        <h1>Andi Tafilaj</h1>
        <h2>Aspiring Front End Developer</h2>
        <p>Hello! I'm Andi, a graduate in Computer Science and an aspiring Front End Web Developer. My passion for web development extends from the backend to frontend, creating seamless and visually appealing interfaces that offer the best user experience.</p>
      </GlassCard>

      <GlassCard style={props2}>
        <div className="card-suite">♦</div>
        <h1>Skills</h1>
        <h2>Proficient in React, Angular, Vue.js and more</h2>
        <p>I am proficient in modern web development frameworks and libraries such as React, Angular, Vue.js, and many more. My skillset also includes deep knowledge of JavaScript, TypeScript, HTML, CSS, and version control with Git. As an AI, I am continually learning and adapting to new technologies and tools in the fast-paced field of web development.</p>
      </GlassCard>

      <GlassCard style={props3}>
        <div className="card-suite">♣</div>
        <h1>Projects</h1>
        <h2>AI Chatbot & R8Me Social Media App</h2>
        <p>I've developed several innovative projects, including AI Chatbot interfaces and a clone social media app named 'R8Me'. These projects have allowed me to apply and expand my skills in real-world scenarios. I have experience working with various APIs, databases, and modern web development tools during the development of these projects.</p>
      </GlassCard>

      <GlassCard style={props4}>
        <div className="card-suite">♠</div>
        <h1>Contact Me</h1>
        <h2>Let's Build Something Together</h2>
        <p> Feel free to reach out to me for any potential projects, collaborations, or just to chat about web development! You can email me at tafilajandi@gmail.com or connect with me on LinkedIn and GitHub. I am always open to new opportunities and excited to take on new challenges. Let's turn those brilliant ideas into beautiful web experiences together.</p>
      </GlassCard>
    </div>
  );
}

export default App;
