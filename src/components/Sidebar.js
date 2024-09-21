import { LitElement, html, css } from 'lit';
import { router } from '../Routing';

class Sidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 80px;
      height: 100vh;
      background-color: #f9f1f8;
      padding: 20px 10px;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .menu-toggle {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-bottom: 40px;
      display: block;
    }

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }

    .menu-item.active {
      color: #5e3c87;
    }

    .menu-item-icon {
      width: 40px;
      height: 40px;
      background-color: #f4e9f7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
    }

    .menu-item.active .menu-item-icon {
      background-color: #e5daf8;
    }

    .menu-item-label {
      font-size: 12px;
    }

    .new-client-button {
      width: 60px;
      height: 60px;
      background-color: #ffd3d8;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      cursor: pointer;
      border: none;
    }

    .new-client-button:hover {
      background-color: #ffb5ba;
    }

    /* Icons as placeholder text for now; replace with real icons */
    .icon {
      font-size: 24px;
      color: #5e3c87;
    }
    .sidebar-container {
    display: grid;
    justify-content: center;
    }
  `;

  // Event handlers for navigation
  goToClients() {
    console.log('Navigating to Clients');
    router.navigate('/list');
    // Add your navigation logic here
  }

  goToDocuments() {
    console.log('Navigating to Notes');
    router.navigate('/about');

    // Add your navigation logic here
  }

  goToHome() {
    console.log('Navigating to Settings');
    router.navigate('/home');
    // Add your navigation logic here
  }

  goToLogin() {
    console.log('Adding New Client');
    router.navigate('/login');
    // Add your logic to add a new client here
  }

  addNewClient() {
    router.navigate('/summary');
  }

  render() {
    return html`
      <div class="sidebar-container">
        <!-- New Client Button -->
        <button class="new-client-button" @click="${this.addNewClient}">
          <span class="icon">+</span>
        </button>

        <!-- Sidebar Menu Items -->
        <button class="menu-item active" @click="${this.goToClients}">
          <div class="menu-item-icon">
            <span class="icon">★</span>
          </div>
          <div class="menu-item-label">Clients</div>
        </button>

        <button class="menu-item" @click="${this.goToDocuments}">
          <div class="menu-item-icon">
            <span class="icon">★</span>
          </div>
          <div class="menu-item-label">Documents</div>
        </button>
        <button class="menu-item" @click="${this.goToHome}">
          <div class="menu-item-icon">
            <span class="icon">★</span>
          </div>
          <div class="menu-item-label">Home</div>
        </button>
        <button class="menu-item" @click="${this.goToLogin}">
          <div class="menu-item-icon">
            <span class="icon">★</span>
          </div>
          <div class="menu-item-label">Logout</div>
        </button>
      </div>
    `;
  }
}

customElements.define('my-sidebar', Sidebar);
