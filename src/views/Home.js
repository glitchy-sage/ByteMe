import { html, render } from 'lit-html';
import { router } from '../Routing';

class Home {
  render() {
    return html`
      <div class="container">
        <h2>Home Page</h2>
        <p>Welcome to the home page!</p>
        <a href="#" @click="${(e) => this.goToAbout(e)}">Go to About Page</a>
        <a href="#" @click="${(e) => this.logout(e)}">Logout</a>
      </div>
    `;
  }

  goToAbout(event) {
    event.preventDefault();
    router.navigate('/about');
  }

  logout(event) {
    event.preventDefault();
    router.navigate('/login');
  }
}

export default Home;
