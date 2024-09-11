import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';  // To render routed content (pages)

// App component that contains the dynamic header, footer, and main content
const App = () => {
  const location = useLocation(); // Get the current route path

  // You can add logic to switch the header and footer based on the current route
  const renderHeader = () => {
    switch (location.pathname) {
      case '/login':
        return <Header title="Login Page Header" />;
      case '/':
        return <Header title="Home Page Header" />;
      case '/other':
        return <Header title="Other Page Header" />;
      default:
        return <Header title="Default Header" />;
    }
  };

  const renderFooter = () => {
    switch (location.pathname) {
      case '/login':
        return null; // No footer on the login page
      case '/':
        return <Footer showNextButton={true} />;
      case '/other':
        return <Footer showBackButton={true} />;
      default:
        return null; // No footer on unknown pages
    }
  };

  return (
    <>
      {/* Render the dynamic header based on the current route */}
      {/* {renderHeader()} */}

      {/* Main content rendered based on routing */}
      <main>
        <Outlet /> {/* Outlet is where routed components (pages) will render */}
      </main>

      {/* Render the dynamic footer based on the current route */}
      {/* {renderFooter()} */}
    </>
  );
};

export default App;
