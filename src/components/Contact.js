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

  return <div className="Contact">This is the Contact component</div>;
};

export default Contact;
