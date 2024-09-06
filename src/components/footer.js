import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: #f8f9fa;
      border-top: 1px solid #dee2e6;
      text-align: center;
    }
  `;

  render() {
    return html`
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    `;
  }
}
