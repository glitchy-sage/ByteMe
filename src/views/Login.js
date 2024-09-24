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

      .container {
        max-width: 400px;
        margin: 0 auto;
      }

      h2 {
        margin-bottom: 20px;
        font-size: 1.5rem;
        color: #333;
        text-align: center;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9rem;
        color: #333;
      }

      input[type="text"],
      input[type="password"] {
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

      button {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        color: white;
        background-color: #6c757d;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      @media (max-width: 600px) {
        .container {
          padding: 0 20px;
        }
      }
    `,
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

          <button class="my-button" type="submit">Login</button>
        </form>
      </div>
    `;
  }

  handleLogin(event) {
    event.preventDefault();
  
    const username = this.shadowRoot.getElementById('username').value;
    const password = this.shadowRoot.getElementById('password').value;
  
    if (!username || !password) {
      alert('Please fill in both the username and password fields.');
      return;
    }
  
    if (password === 'pass') {
      router.navigate('/home');
    } else {
      alert('Incorrect password. Please try again.');
    }
  }
  }

customElements.define('my-login', Login);
