import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('landing-view')
class LandingView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  render() {
    return html`
      <div>
        <h2>Landing Page</h2>
        <p>Welcome to the landing page!</p>
      </div>
    `;
  }
}
