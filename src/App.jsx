import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';  // To render routed content

const App = () => {
  const location = useLocation(); // Get the current route path

  const renderHeader = () => {
    switch (location.pathname) {
      case '/login':
        return null; // No header on login page
      case '/':
        return <Header title="Home Header" />;
      case '/other':
        return <Header title="Other Page Header" />;
      default:
        return <Header title="Default Header" />;
    }
  };

  const renderFooter = () => {
    switch (location.pathname) {
      case '/login':
        return null; // No footer on login page
      case '/':
        return <Footer showNextButton={true} />;
      case '/other':
        return <Footer showBackButton={true} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderHeader()}
      <main>
        <Outlet />
      </main>
      {renderFooter()}
    </>
  );
};

export default App;
