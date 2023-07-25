import React, { useState, useEffect } from 'react';
import './App.css';
import StackCards from './StackCards';

// import the components
import Name from './components/Name';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const componentMap = {
  'Name': Name,
  'Skills': Skills,
  'Projects': Projects,
  'Contact': Contact
};

function App() {
  const [currentComponent, setCurrentComponent] = useState('Name');
  const CurrentComponent = componentMap[currentComponent];
  const { cardContent, columnOneContent, columnTwoContent } = CurrentComponent();

  useEffect(() => {
    // Remove all applied classes from the body
    Object.keys(componentMap).forEach((key) => {
      document.body.classList.remove(key);
    });

    // Add the current component's class to the body
    document.body.classList.add(currentComponent);

    // Clean up function to remove the class when the component will unmount
    return () => {
      document.body.classList.remove(currentComponent);
    };
  }, [currentComponent]);

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="component-container">
          {cardContent}
        </div>

        <div className="row-one">
          {columnOneContent}
        </div>

        <div className="row-two">
          {columnTwoContent}
        </div>
      </div>

      <div className="card-stack-container">
        <StackCards setCurrentComponent={setCurrentComponent}/>
      </div>
    </div>
);

}

export default App;
