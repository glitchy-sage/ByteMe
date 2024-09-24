import { html, render } from 'lit';
import '/src/components/Sidebar';  // Import Sidebar component
import './views/Login.js';  // Import Login component
import './views/Home.js';   // Import Home component
import './views/About.js';  // Import About component
import './views/client/ClientSummary.js';  // Import client summary component
import './views/client/ClientDetails.js';  // Import client details component
import './views/client/ClientList.js';  // Import client list component
import './views/pipedrive/Dashboard.js';  // Import pipedrive dashboard component

export class Routing {
  constructor() {
    // Define routes and their associated templates
    this.routes = {
      '/login': () => html`<my-login></my-login>`,
      '/home': () => html`<my-home></my-home>`,
      '/about': () => html`<my-about></my-about>`,
      '/summary': () => html`<my-summary></my-summary>`,
      '/client': () => html`<my-client></my-client>`,
      '/list': () => html`<my-list></my-list>`,
      '/dashboard': () => html`<my-dashboard></my-dashboard>`,
    };

    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname);
    });

    // Initialize the app with the current route
    this.navigate(window.location.pathname);
  }

  renderSidebar(route) {
    const sidebarContainer = document.getElementById('sidebar');

    // Conditionally render the sidebar for non-login routes
    if (route !== '/login') {
      render(html`<my-sidebar></my-sidebar>`, sidebarContainer); // Safely render the sidebar
    } else {
      render(html``, sidebarContainer); // Clear the sidebar on the login page
    }
  }

  navigate(route) {
    const appContainer = document.getElementById('app');

    // Check if the route exists in the routes object
    if (this.routes[route]) {
      // Render the corresponding template by invoking the function from the routes object
      render(this.routes[route](), appContainer);  // Notice we invoke the function

      // Conditionally render the sidebar
      this.renderSidebar(route);

      // Update the URL without reloading the page
      if (window.location.pathname !== route) {
        window.history.pushState({}, '', route);
      }
    } else {
      console.error('Route not found, redirecting to /login');
      this.navigate('/login');  // Handle unknown routes
    }
  }

  static handleNavigation(event, route) {
    event.preventDefault();
    router.navigate(route);
  }
}

export const router = new Routing();
