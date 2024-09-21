import { html } from 'lit-html';
import AuthService from '../services/AuthService';

const LoginPage = (router) => {
  let username = '';
  let password = '';

  const handleLogin = () => {
    if (AuthService.login(username, password)) {
      router.navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return html`
    <div class="container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          @input=${(e) => (username = e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          @input=${(e) => (password = e.target.value)}
        />
        <button class="btn btn-primary" @click=${handleLogin}>Login</button>
      </div>
    </div>
  `;
};

export default LoginPage;
