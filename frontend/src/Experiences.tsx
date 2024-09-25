import React from 'react';

interface ExperiencesProps {
  experiences: string[];
}

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <>
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <span key={index}>
            {experience}{index < experiences.length - 1 ? ', ' : ''}
          </span>
        ))
      ) : (
        <span>Has no experiences</span>
      )}
    </>
  );
};

export default Experiences;
