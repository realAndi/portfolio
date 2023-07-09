import React, { useEffect } from 'react';
import './Components.css';

const Skills = () => {
  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Skills');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Skills');
    };
  }, []);

  return <div className="Skills">This is the Skills component</div>;
};

export default Skills;
