import React from 'react';

const Header = () => {
  const showEmailAlert = () => {
    alert('email: bardha@hiof.no');
  };

  return (
    <header className="w-full bg-background-800 text-text-50 p-4 shadow-lg">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#Bardh" className="hover:text-background-200 text-lg font-semibold">
              Bardh Arifi
            </a>
          </li>
          <li>
            <a href="#bio" className="hover:text-background-200 text-lg font-semibold">
              Bio
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-background-200 text-lg font-semibold">
              Projects
            </a>
          </li>
          <li>
            <a href="#mail" onClick={showEmailAlert} className="hover:text-background-200 text-lg font-semibold">
              Email
            </a>
          </li>
          <li>
            <a href="#contact-form" className="hover:text-background-200 text-lg font-semibold">
              Contact-Form
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
