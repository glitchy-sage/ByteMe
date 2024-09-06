import { html, css, LitElement } from 'lit';

class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  handleLogin() {
    localStorage.setItem('authToken', 'dummy-token'); // Simulate login
    window.location.pathname = '/login'; // Redirect to default page after login
  }

  render() {
    return html`
      <h2>Login Page</h2>
      <button @click="${this.handleLogin}" class="btn btn-primary">Login</button>
    `;
  }
}

customElements.define('login-page', LoginPage);
