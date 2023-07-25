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

  const cardContent = (
    <div className="title">This is the Projects component</div>
  );

  const columnOneContent = (
    <div className="rowContent">This is column one content for Projects</div>
  );

  const columnTwoContent = (
    <div className="rowContent">This is column two content for Projects</div>
  );

  return { cardContent, columnOneContent, columnTwoContent };};

export default Projects;
