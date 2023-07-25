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

  const cardContent = (
    <div className="title">This is the Skills component</div>
  );

  const columnOneContent = (
    <div className="rowContent">This is column one content for Skills</div>
  );

  const columnTwoContent = (
    <div className="rowContent">This is column two content for Skills</div>
  );

  return { cardContent, columnOneContent, columnTwoContent };};

export default Skills;
