import { html, css, LitElement } from 'lit';
import { ViewBase } from './ViewBase.js'; // Import the ViewBase class

class ViewExample extends ViewBase {
  // Define component-specific styles using `css`
  static styles = [
    sharedStyles,
    css`
    :host {
      display: block;
      height: 100vh;
      width: 65px;
      background-color: #2c3e50;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      font-family: Arial, sans-serif;
      // box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
  `];

  // Render the HTML template
  render() {
    return html`
      <div class="sidebar">
        <a href="/home" @click="${(e) => this.navigate(e, '/home')}">Home</a>
        <button label"click me!"> </button>
      </div>
    `;
  }

  // Navigation handler to prevent default link behavior and simulate routing
  navigate(event, route) {
    event.preventDefault();
    window.history.pushState({}, '', route);
    router.navigate(route);
  }
}

// Define the custom element for the view
customElements.define('my-view', ViewExample);
