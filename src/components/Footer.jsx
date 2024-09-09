import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ showNextButton, showBackButton }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <footer className="footer bg-light py-3">
      <div className="container d-flex justify-content-between">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Back
          </button>
        )}
        {showNextButton && (
          <button onClick={() => navigate('/other')} className="btn btn-primary">
            Next
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
