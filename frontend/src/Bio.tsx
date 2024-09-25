import React from 'react';
import Experiences from './Experiences';

const Bio = () => {
  const experiences = ["Java", "React", "Cyber Security", "HTML", "CSS"];

  return (
    <section className="bio">
      <div className="profile-pic">
        <img 
          src="/profile.jpg"   
          alt="Bardh Arifi" 
        />
      </div>
      
      <h2>Bardh Arifi</h2>
      <h3>Bio</h3>

      <div className="bio-box">
        <p>3. år informatikk student</p>
        <p>Experiences: 
          <Experiences experiences={experiences} />
        </p>
      </div>
    </section>
  );
};

export default Bio;
