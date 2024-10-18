import React from 'react';
import Experiences from './Experiences';

const Bio = () => {
  const experiences = ["Java", "React", "Cyber Security", "HTML", "CSS"];

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center p-8 text-center rounded-lg shadow-xl w-11/12 max-w-7xl mx-auto border-2 bg-secondary-200">
      <div className="w-full lg:w-1/3 flex justify-center mb-5 lg:mb-0 lg:mr-8">
        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
          <img 
            src="/profile.jpg"   
            alt="Bardh Arifi" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-center text-left w-full lg:w-2/3">
        <h2 className="text-3xl font-bold mb-2">Bardh Arifi</h2>
        <h3 className="text-xl font-semibold mb-4">Bio</h3>

        <div className="bg-white rounded-lg shadow-md p-4 w-full">
          <p className="mb-2">3. år informatikk student</p>
          <p>Experiences:</p>
          <Experiences experiences={experiences} />
        </div>
      </div>
    </section>
  );
};

export default Bio;
