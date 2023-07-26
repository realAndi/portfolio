import React, { useEffect, useState } from 'react';
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
  return (
    <div className="col">
      <div className="title">This is the Projects component</div>
      <div className="row-one">
        <div className="rowContent">This is column one content for Projects</div>
      </div>
      <div className="row-two">
        <div className="rowContent">This is column two content for Projects</div>
      </div>
    </div>
  );
};

export default Projects;
