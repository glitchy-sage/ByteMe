import { css, html, render } from 'lit';
import { router } from '../Routing';

class Login {
  static styles = css`
  :host {
    background-color: #2c3e50;
    font-family: Arial, sans-serif;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  }
`;

  render() {
    return html`
      <div class="container">
        <h2>Login</h2>
        <form @submit="${this.handleLogin}">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p><a href="#" @click="${(e) => this.goToAbout(e)}">Learn more about us</a></p>
      </div>
    `;
  }

  handleLogin(event) {
    event.preventDefault();
    router.navigate('/home');
  }

  goToAbout(event) {
    event.preventDefault();
    router.navigate('/about');
  }
}

export default Login;
