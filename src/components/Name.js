import React, { useEffect, useState } from 'react';
import './Components.css';
import profilePic from './assets/profile_pic.jpg';

const Name = () => {
  useEffect(() => {
    // When the component mounts
    document.body.classList.add('Name');

    // When the component unmounts
    return () => {
      document.body.classList.remove('Name');
    };
  }, []);

  return (
    <div className="col">
      <div className="title">
        <img src={profilePic} className="profile-pic" alt="profile"/>
        Hello, my name is Andi
      </div>
      <div className="rowContent">
    Lets get straight to the point, to answer the "What's your biggest weakness" question in interviews, mine would simply be self-introductions. For me they are difficult to 
    write or speak without sounding egotistical. So with all of that in mind, lets  start with my name, Andi, I am an Albanian-American Front-end Web developer, specializing in ReactJS and Flutter, and I am deeply passionate about web development.
    I recently completed my BA in Computer Science from Pace University, leaving a lasting legacy as the former president of the Albanian SWE club.

    Outside of professional pursuits, I am a fan of skiing, a sport I recently learned. So if you ever want to watch somebody eat snow during the winter, definitely bring me to your Ski-trips!.
    However, I still find myself loving summer, especially the beaches and pools. As somebody born in June, it is expected of me to love the summer. 

    I thrive on social interaction, so when we work together, expect many engaging conversations that help us understand each other better, or the world around us. There is no limit 
    with me on what we talk about. 
    
    During my school days, I spent my free time working as a waiter in restaurants, which allowed me to meet and interact with diverse individuals.

    In my personal life, I am fortunate to have met a wonderful person, my partner Yoonie. 
    Her unwavering support and motivation were crucial in helping me successfully complete many projects during my studies. 
    I am deeply grateful for her presence in my life. Yoonie, I love you.

    </div>
    <div className="rowContent">
      If you were to ask me personally what I'm enjoying right now, it would be working with AI. I'm not sure why many developers will tell you that it isn't helpful, but in my experience, it's like having
      a personal sideman that will watch you code. For a good amount of my projects and work, I've been using AI to critique my own code as well as spot easy to miss errors. I believe that we are 
      currently facing a divide of work styles. Some developers will perform better with an AI sideman, and some developers simply refuse to change work-habits. I like to believe myself to be always adapting to changes. 
      Where whatever new comes out, I will get right on it, just in case it becomes more popular than it is.
    </div>
    </div>
  );
};

export default Name;