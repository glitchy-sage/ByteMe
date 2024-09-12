import { html, css, LitElement } from 'lit';

class Sidebar extends LitElement {
  // Define component-specific styles using `css`
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 250px;
      background-color: #2c3e50;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      font-family: Arial, sans-serif;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    }

    h3 {
      padding: 20px;
      margin: 0;
      background-color: #34495e;
      text-align: center;
      font-size: 1.5em;
      color: white;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 15px 20px;
    }

    li a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }

    li a:hover {
      background-color: #2980b9;
      padding-left: 30px;
      transition: padding-left 0.3s ease-in-out;
      display: block;
    }
  `;

  // Render the HTML template
  render() {
    return html`
      <div class="sidebar">
        <h3>Sidebar</h3>
        <ul>
          <li><a href="/home" @click="${(e) => this.navigate(e, '/home')}">Home</a></li>
          <li><a href="/about" @click="${(e) => this.navigate(e, '/about')}">About Us</a></li>
          <li><a href="/services" @click="${(e) => this.navigate(e, '/services')}">Services</a></li>
          <li><a href="/contact" @click="${(e) => this.navigate(e, '/contact')}">Contact</a></li>
        </ul>
      </div>
    `;
  }

  // Navigation handler to prevent default link behavior and simulate routing
  navigate(event, route) {
    event.preventDefault();
    window.history.pushState({}, '', route);
    const navEvent = new CustomEvent('navigate', { detail: { route } });
    this.dispatchEvent(navEvent);
  }
}

// Export the Sidebar component as a default export
export default Sidebar;

// Define the custom element for the sidebar
customElements.define('my-sidebar', Sidebar);
