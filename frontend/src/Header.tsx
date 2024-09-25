import React from 'react';

const Header = () => {
  const showEmailAlert = () => {
    alert('email: bardha@hiof.no');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><a href="#Bardh">Bardh Arifi</a></li>
          <li><a href="#bio">Bio</a></li>
          <li><a href="#projects">Projects</a></li>
          <li>
            <a href="#mail" onClick={showEmailAlert}>
              Email
            </a>
          </li>
          <li><a href="#contact-form">Contact-Form</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
