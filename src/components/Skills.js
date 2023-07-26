import React, { useEffect, useState } from 'react';
import './Components.css';
import AngularJS from './assets/skills/angularjs.svg';
import Javascript from './assets/skills/javascript.svg';
import NodeJS from './assets/skills/nodejs.svg';
import ReactJS from './assets/skills/react.svg';
import Tailwind from './assets/skills/tailwind.svg';
import VueJS from './assets/skills/vuejs.svg';
import Firebase from './assets/skills/firebase.svg'
import AWS from './assets/skills/AWS.svg'
import Figma from './assets/skills/figma.svg'



const Skills = () => {
  const [showAdditionalSkills, setShowAdditionalSkills] = useState(false);

  const handleDismiss = () => {
    setShowAdditionalSkills(false);
  };

  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Skills');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Skills');
    };
  }, []);

  const heartPositions = Array.from({ length: 3 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

  return (
    <div>
      <div className="title">
        Skills and Expertise
      </div>
      
      <div className="rowContent">
        While my heart's set on front-end, I've dipped my toes into pretty much every aspect of web development. 
        You're seeing my top favorites here, but go ahead and hit that button below to see the full shebang. It's a lengthy list, don't say I didn't warn you!
      </div>

      <div className="rowContent">
      <div className="subColumn">
        <div className="subRowContent">
          <div className="image-container">   {/*Only did this for the heart effect */}
            <img src={ReactJS} className="iconF" alt="ReactJS"/>
            {heartPositions.map(({ top, left }, index) => (
              <div
                className="heart"
                style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${index * 0.6}s` }}
                key={index}
                >
                  ❤️
                </div>
              ))}
              </div>
              ReactJS
          </div>
          <div className="subRowContent">
            <img src={Javascript} className="iconF" alt="Javascript"/>
            Javascript
          </div>
          <div className="subRowContent">
            <img src={VueJS} className="iconF" alt="VueJS"/>
            VueJS
          </div>
        </div>
        <div className="subColumn">
          <div className="subRowContent">
            <img src={AngularJS} className="iconF" alt="AngularJS"/>
            Angular
          </div>
          <div className="subRowContent">
            <img src={Tailwind} className="iconF" alt="Tailwind"/>
            Tailwind
          </div>
          <div className="subRowContent">
            <img src={NodeJS} className="iconF" alt="NodeJS"/>
            NodeJS
          </div>
        </div>
        <div className="subColumn">
          <div className="subRowContent">
            <img src={AWS} className="iconF" alt="AWS"/>
            AWS
          </div>
          <div className="subRowContent">
            <img src={Firebase} className="iconF" alt="Firebase"/>
            Firebase
          </div>
          <div className="subRowContent">
            <img src={Figma} className="iconF" alt="Figma"/>
            Figma
          </div>
        </div>
        <button className="purple-btn"onClick={() => setShowAdditionalSkills(!showAdditionalSkills)}>
          View More
        </button>
        {showAdditionalSkills && (
          <div className="additional-skills-modal">
            <div className="additional-skills-container">
              <div className="columnContent"> 
                <p>Adobe Photoshop</p>
                <p>Adobe After Effects</p>
                <p>Adobe Illustrator</p>
                <p>Adobe XD</p>
                <p>VSCode</p>
                <p>Microsoft Office</p>
                <p>Google Cloud</p>
                <p>Shopify</p>
                <p>Wordpress</p>
                <p>Webflow</p>
                <p>CMS management</p>
                <p>Docker</p>
                <p>Visual Studio Code</p>
                <p>Docker</p>
                <p>Git</p>
                <p>npm</p>
                <p>Webpack</p>
                <p>Babel</p>
              </div>
              <div className="columnContent"> 
                <p>IntelliJ IDEA</p>
                <p>Sublime Text</p>
                <p>ESLint</p>
                <p>Prettier</p>
                <p>Chrome DevTools</p>
                <p>Postman</p>
                <p>Jest</p>
                <p>Mocha</p>
                <p>Chai</p>
                <p>AWS:EC2</p>
                <p>AWS:ECS</p>
                <p>Cypress</p>
                <p>Selenium</p>
                <p>Jenkins</p>
                <p>Travis CI</p>
                <p>CircleCI</p>
                <p>Heroku</p>
                <p>Netlify</p>
              </div>
              <div className="columnContent"> 
                <p>Golang</p>
                <p>Java</p>
                <p>C</p>
                <p>C++</p>
                <p>PostgreSQL</p>
                <p>MongoDB</p>
                <p>MySQL</p>
                <p>Java</p>
                <p>Express.js</p>
                <p>Django</p>
                <p>Ruby on Rails</p>
                <p>ASP.NET</p>
                <p>Spring Framework</p>
                <p>RESTful API design</p>
                <p>Microservices architecture</p>
                <p>GraphQL</p>
                <p>NextJS</p>
                <p>Javascript</p>
                <p>TypeScript</p>
                <p>CSS</p>
                <p>Bootstrap</p>
              </div>
              <div className="columnContent"> 
                <p>jQuery</p>
                <p>Swift (SwiftUI)</p>
                <p>Redux</p>
                <p>GraphQL</p>
                <p>SASS/SCSS</p>
                <p>Responsive Web Design</p>
                <p>Material-UI</p>
                <p>RESTful APIs</p>
                <p>Web Accessibility (WCAG)</p>
                <p>D3.js</p>
              </div>
            </div>
            <button className="purple-btn" onClick={handleDismiss}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
