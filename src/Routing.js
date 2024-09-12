import { render, html } from 'lit';
import Sidebar from '/src/components/Sidebar'; // Import your sidebar component

export class Routing {
  constructor() {
    this.routes = {
      '/login': () => import('./views/Login'),
      '/home': () => import('./views/Home'),
      '/about': () => import('./views/About'),
    };

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname);
    });

    // Render the sidebar in a separate container
    this.renderSidebar();
  }

  // Function to render the sidebar
  renderSidebar(route) {
    const sidebarContainer = document.getElementById('sidebar');

    // Conditionally render the sidebar for non-login routes
    if (route !== '/login') {
      render(html`<my-sidebar></my-sidebar>`, sidebarContainer); // Safely render the sidebar
    } else {
      render(html``, sidebarContainer); // Clear the sidebar on login page
    }
  }

  // Function to navigate and render the appropriate page
  navigate(route) {
    const appContainer = document.getElementById('app');

    if (this.routes[route]) {
      this.routes[route]().then((module) => {
        const page = new module.default();

        // Render the page content inside the appContainer using Lit's render method
        render(page.render(), appContainer);
        
        // Conditionally render the sidebar
        this.renderSidebar(route);
        
        // Update the URL without reloading the page
        if (window.location.pathname !== route) {
          window.history.pushState({}, '', route);
        }
      });
    } else {
      // Handle 404 or redirect to login
      this.navigate('/login');
    }
  }

  static handleNavigation(event, route) {
    event.preventDefault();
    router.navigate(route);
  }
}

export const router = new Routing();
