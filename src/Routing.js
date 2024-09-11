import Sidebar from '/src/components/Sidebar';
import { html, render } from 'lit-html';

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
  }

  // Navigate to a new route and update the URL path
  navigate(route) {
    // Clear the previous content in #app before rendering a new page
    const appContainer = document.getElementById('app');
    render(html``, appContainer);  // Clear content safely

    if (this.routes[route]) {
      this.routes[route]().then((module) => {
        const page = new module.default();
        page.render();

        // Show sidebar only if the route is not login
        if (route !== '/login') {
          const sidebar = new Sidebar();
          sidebar.render();
        } else {
          // Clear the sidebar if on login page
          render(html``, document.getElementById('sidebar')); // Clear sidebar safely
        }

        // Update the URL without reloading the page
        if (window.location.pathname !== route) {
          window.history.pushState({}, '', route);
        }
      });
    } else {
      // Redirect to /login for invalid routes
      this.navigate('/login');
    }
  }

  static handleNavigation(event, route) {
    event.preventDefault();
    router.navigate(route);
  }
}

export const router = new Routing();
