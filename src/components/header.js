import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-header')
class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    h1 {
      margin: 0;
    }
  `;

  render() {
    return html`
      <header>
        <h1>My App</h1>
      </header>
    `;
  }
}
