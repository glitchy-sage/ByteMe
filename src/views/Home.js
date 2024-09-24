import { html, LitElement, css } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';  
import { store } from '/src/Store';
import { clients } from '/src/constants/ClientList';

class Home extends LitElement {

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .home-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 10px;
      }

      .header-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .header-icons {
        display: flex;
        gap: 15px;
      }

      .header-icons img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .header-image {
        width: 100%;
        height: 200px;
        background-image: url("/src/images/avatar.png");
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }

      .header-buttons {
        display: flex;
        gap: 15px;
      }

      .header-buttons button {
        padding: 10px 20px;
        font-size: 0.9rem;
        cursor: pointer;
      }

      h2 {
        margin-bottom: 20px;
        font-size: 1.5rem;
        color: #333;
      }

      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        font-size: 1.1rem;
        margin-top: 1.1rem;
      }

      .search-container {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
      }

      .search-input {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 250px;
      }

      .search-input input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        margin-left: -3px;
        margin-top: 5px;
      }

      .client-buttons {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }

      .client-buttons button {
        flex: 1;
        padding: 10px;
        font-size: 1rem;
        cursor: pointer;
      }

      .recent-clients, .documents {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        flex-wrap: wrap;
      }

      .client-item, .document-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100px;
        margin-bottom: 20px;
      }

      .client-avatar, .document-icon {
        width: 60px;
        height: 60px;
        background-color: #e0e0e0;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      .document-icon {
        border-radius: 10px;
      }

      .recent-clients h4, .document-item h4 {
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .header-image {
          flex-direction: column;
          height: auto;
          padding: 20px 10px;
        }

        .header-buttons {
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
          position: absolute;
        }

        .client-buttons {
          flex-direction: column;
        }
        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `
  ];

  constructor() {
    super();
    this.initialise();
  }

  initialise() {}

  firstUpdated() {
    this.addEnterKeyListener();
  }

  addEnterKeyListener() {
    this.shadowRoot.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._existingClient(event);
      }
    });
  }

  navigateToClientDetails(event, client) {
    event.preventDefault();
    store.set('clientInfo', { client });
    router.navigate('/summary');
  }

  _newClient(event) {
    event.preventDefault();
    router.navigate('/client');
  }

  _existingClient(event) {
    event.preventDefault();
    const name = this.shadowRoot.getElementById('name').value;
    const id = this.shadowRoot.getElementById('id').value;

    store.set('searchParams', { name, id });

    router.navigate('/list');
  }

  render() {
    return html`
      <div class="home-container">
      <h2>Byte Me</h2>
        <!-- Grey Image with Buttons -->
        <div class="header-image">
          <div class="background-image">
            <h3>Background placeholder</h3>
          </div>
          <div class="header-buttons">
            <button class="my-button" @click="${() => router.navigate('/list')}">View all clients</button>
            <button class="my-button" @click="${() => router.navigate('/dashboard')}">Dashboard</button>
          </div>
        </div>

        <!-- Search Client Section -->
        <div class="header">
          <h3>Search client</h3>
        </div>
        <div class="search-container">
          <div class="search-input">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div class="search-input">
            <label for="id">ID Number</label>
            <input type="text" id="id" name="id" placeholder="9809240106084" />
          </div>
        </div>

        <!-- New Client and Existing Client Buttons -->
        <div class="client-buttons">
          <button class="my-button" @click="${(e) => this._newClient(e)}">New Client</button>
          <button class="my-button" @click="${(e) => this._existingClient(e)}">Existing Client</button>
        </div>

        <!-- Recent Clients Section -->
        <div class="section-title">
          <h3>Recent clients (7 of 50)</h3>
        </div>
        <div class="recent-clients">
          ${this.renderRecentClients()}
        </div>
      </div>
    `;
  }

  renderRecentClients() {
    const recentClients = [...clients].sort((a, b) => new Date(b.lastInteractionDate) - new Date(a.lastInteractionDate)).slice(0, 7);
    return recentClients.map(client => html`
      <div class="client-item" @click="${(e) => this.navigateToClientDetails(e, client)}">
        <div class="client-avatar"></div>
        <h4>${client.name}</h4>
      </div>
    `);
  }
}

customElements.define('my-home', Home);

export default Home;
