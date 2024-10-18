import React from 'react';

interface ExperiencesProps {
  experiences: string[];
}

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 mt-2">
      {experiences.map((experience, index) => (
        <span key={index} className="bg-primary-100 text-primary-900 px-4 py-2 rounded-lg shadow-sm">
          {experience}
        </span>
      ))}
    </div>
  );
};

export default Experiences;
