import React, { useEffect } from 'react';
import './Components.css';

const Contact = () => {
  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Contact');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Contact');
    };
  }, []);

  const cardContent = (
    <div className="title">This is the Contact component</div>
  );

  const columnOneContent = (
    <div className="rowContent">This is column one content for Contact</div>
  );

  const columnTwoContent = (
    <div className="rowContent">This is column two content for Contact</div>
  );

  return { cardContent, columnOneContent, columnTwoContent };
};

export default Contact;
