import { LitElement, css, html } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';
import { ViewBase } from './ViewBase.js';

class Login extends ViewBase {
  static styles = [
    sharedStyles,
    css`
    :host {
      display: block;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
      color: #333;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-size: 0.9rem;
      color: #333;
    }

    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .login-form {
      width: 100%;
    }
    `
  ];

  render() {
    return html`
      <div class="container">
        <div class="login-container">
          <h2>Login</h2>
        </div>
        <form @submit="${this.handleLogin}">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" value="John Doe" />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" />

          <button type="submit" class="my-button">Login</button>
        </form>
      </div>
    `;
  }

  handleLogin(event) {
    event.preventDefault();
    router.navigate('/home');
  }
}

customElements.define('my-login', Login);
