import { LitElement, css, html } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';
import { ViewBase } from './ViewBase.js';
import { loginCredentials } from '/src/constants/LoginCredentials'

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

  static properties = {
    clientName: { type: String }
  };

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

  async getHashedPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async handleLogin(event) {
    event.preventDefault();

    // Get the username and password entered by the user
    const enteredUsername = this.shadowRoot.getElementById('username').value;
    const enteredPassword = this.shadowRoot.getElementById('password').value;

    // Find the user in the loginCredentials array
    const user = loginCredentials.find(user => user.username === enteredUsername);

    if (!user) {
      // If the user is not found, show an error
      alert('Username not found.');
      return;
    }

    let hashedPassword = await this.getHashedPassword(enteredPassword);
    console.log(hashedPassword)
    console.log(user.password)
    if (user.password === hashedPassword) {
      // Passwords match, proceed to login
      router.navigate('/home');
    } else {
      // Passwords do not match
      alert('Incorrect password.');
    }
  }
}

customElements.define('my-login', Login);
