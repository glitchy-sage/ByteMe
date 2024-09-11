import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import OtherPage from '../pages/OtherPage';

// Simulate a basic authentication check
const isAuthenticated = () => {
  // Replace this logic with actual authentication check
  return localStorage.getItem('authenticated') === 'true';
};

const Routing = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route for HomePage */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <HomePage /> : <Navigate to="/login" />
          }
        />

        {/* Additional Protected Route (Other Page) */}
        <Route
          path="/other"
          element={
            isAuthenticated() ? <OtherPage /> : <Navigate to="/login" />
          }
        />
        
        {/* Fallback Route (if page doesn't exist, navigate to login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default Routing;
