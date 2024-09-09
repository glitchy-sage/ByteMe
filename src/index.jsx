import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import Routing from './components/Routing'; // Main routing component

// Get the root DOM element
const container = document.getElementById('root');

// Create the root using createRoot
const root = createRoot(container);

// Render the app using the new createRoot API
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
