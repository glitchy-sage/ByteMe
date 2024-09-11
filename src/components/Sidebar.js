import { html, render } from 'lit-html';
import { router } from '../Routing';

class Sidebar {
  render() {
    const template = html`
      <div class="sidebar bg-light" style="width: 250px; height: 100vh; position: fixed; top: 0; left: 0;">
        <ul class="nav flex-column">
          <li class="nav-item">
          <button type="button" href="/home" class="btn btn-primary">+</button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about" @click="${(e) => this.navigate(e, '/about')}">Clients</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about" @click="${(e) => this.navigate(e, '/about')}">Notes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about" @click="${(e) => this.navigate(e, '/about')}">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about" @click="${(e) => this.navigate(e, '/about')}">Settings</a>
          </li>
        </ul>
      </div>
    `;
    render(template, document.getElementById('sidebar'));
  }

  navigate(event, route) {
    event.preventDefault();
    router.navigate(route);
  }
}

export default Sidebar;
