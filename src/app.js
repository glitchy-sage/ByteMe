import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './components/header.js';
import './components/footer.js';
import '/src/components/body.js'; // Ensure this import is correct
import { Router } from '/src/router.js';

@customElement('my-app')
class MyApp extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    Router.init(); // Initialize the router
  }

  render() {
    console.log("rendering app.js")
    return html`
      <app-header></app-header>
      <app-body></app-body>
      <app-footer></app-footer>
    `;
  }
}
