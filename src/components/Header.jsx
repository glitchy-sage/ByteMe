import React from 'react';

const Header = ({ title }) => (
  <header className="navbar navbar-light bg-light">
    <div className="container">
      <h1>{title}</h1>
    </div>
  </header>
);

export default Header;
