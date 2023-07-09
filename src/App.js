import React, { useState } from 'react';
import './App.css';
import StackCards from './StackCards';

// import the components
import Name from './components/Name';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [currentComponent, setCurrentComponent] = useState('Name');

  return (
    <div className="app-container">
      <div className="component-container">
        {currentComponent === 'Name' && <Name />}
        {currentComponent === 'Skills' && <Skills />}
        {currentComponent === 'Projects' && <Projects />}
        {currentComponent === 'Contact' && <Contact />}
      </div>
      
      <div className="card-stack-container">
        <StackCards setCurrentComponent={setCurrentComponent}/>
      </div>
    </div>
  );
}

export default App;
