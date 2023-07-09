import React, { useEffect } from 'react';
import './Components.css';

const Projects = () => {
  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Projects');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Projects');
    };
  }, []);

  return <div className="Projects">This is the Projects component</div>;
};

export default Projects;
