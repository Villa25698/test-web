import React from 'react';
import Projects from './Projects';
import Experiences from './Experiences';
import Bio from './Bio';
import ContactForm from './ContactForm';

const PortfolioPage = () => {
  return (
    <div>
      <Bio />
      <Experiences experiences={[]} />
      <Projects />
      <ContactForm />
    </div>
  );
};

export default PortfolioPage;
