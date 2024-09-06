import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('login-view')
class LoginView extends LitElement {


    static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

    handleLogin() {
        // Simulate login and navigate
        Router.navigateTo('/landing');
    }

    render() {
        console.log("rendering login-view.js")

        return html`
      <div>
        <h2>Login</h2>
        <form @submit=${this.handleLogin}>
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    `;
    }
}
