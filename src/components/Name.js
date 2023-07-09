import React, { useEffect } from 'react';
import './Components.css';

const Name = () => {
  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Name');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Name');
    };
  }, []);

  return <div className="Name">This is the Name component</div>;
};

export default Name;
