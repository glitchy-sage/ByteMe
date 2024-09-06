import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'; // Correct import for decorators
import { Router } from '../router.js';

// @customElement('app-body')
class AppBody extends LitElement {
    @property({ type: Object }) view = Router.getCurrentView();

  constructor() {
    super();
    this.view = Router.getCurrentView();
  }

  static properties = {
    view: { type: Router.currentView }
  };
//   accessor view = {}; // ✅ This is good

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('view')) {
      Router.navigateTo(this.view.path);
    }
  }

  render() {
    console.log("rendering body.js")

    return html`
      <main class="container mt-4">
        ${this.view ? html`<${this.view.component}></${this.view.component}>` : html`<p>Loading...</p>`}
      </main>
    `;
  }
}
customElements.define("app-body", AppBody)

