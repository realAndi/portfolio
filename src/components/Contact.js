import React, { useEffect, useState } from 'react';
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
  return (
    <div className="col">
      <div className="title">This is the Contact component</div>
      <div className="row-one">
        <div className="rowContent">This is column one content for Contact</div>
      </div>
      <div className="row-two">
        <div className="rowContent">This is column two content for Contact</div>
      </div>
    </div>
  );
};

export default Contact;
