import { html, LitElement, css } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';  // Import the shared styles
import { ClientData } from '/src/models/ClientData'; // Importing the client data
import { ClientProfileService } from '/src/services/ClientProfileService';
import { ViewBase } from './ViewBase.js'; // Import the ViewBase class
import { store } from '/src/Store';
import { clients } from '/src/constants/ClientList';

const clientProfileService = new ClientProfileService();
class Home extends ViewBase {

  constructor() {
    super();
    this.initialise();
  }

  initialise() {
    // Fetch a client profile by entity ID
    // const clientDetails = clientProfileService.getAllClients()
    //   .then(profile => {
    //     console.log('Client Profile:', profile);
    //     // Render the profile using lit-html or handle it as needed
    //   })
    //   .catch(error => {
    //     console.error('Error fetching client profile:', error);
    //   });
  }
  
  firstUpdated(){
    this.addEnterKeyListener();
  }

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
        background-image: url("/src/images/avatar.png");
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
    }

    .search-input {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .search-input input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }

    .client-buttons {
      display: flex;
      gap: 20px;
    }

    .recent-clients, .documents {
      display: flex;
      gap: 20px;
      overflow-x: auto;
    }

    .client-item, .document-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100px;
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

    .documents .document-item {
      width: 100px;
    }
    .client-item:hover {
    cursor: pointer;
    }
    .document-item:hover {
    cursor: pointer;
    }
    `
  ];

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
    console.log(client);
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

    // Store the search parameters
    store.set('searchParams', { name, id });

    // Navigate to the client list view
    router.navigate('/list');
}

  render() {
    return html`
<div class="home-container">
        <h2>Byte Me</h2>
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
          <h3>Recent clients (10 of 50)</h3>
        </div>

        <div class="recent-clients">
          ${this.renderRecentClients()}
        </div>
          <button class="my-button" @click="${(e) => this._newClient(e)}">View more</button>

        <!-- Documents Section -->
        <div class="section-title">
          <h3>Documents</h3>
        </div>

        <div class="documents">
          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Generate PDF</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Download existing PDF</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>New meeting...</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>View meeting notes...</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Action</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Action</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Action</h4>
          </div>

          <div class="document-item">
            <div class="document-icon"></div>
            <h4>Action</h4>
          </div>
        </div>
      </div>
    `;
  }

  renderRecentClients() {
    // Sort clients by last interaction date
    const recentClients = [...clients].sort((a, b) => new Date(b.lastInteractionDate) - new Date(a.lastInteractionDate)).slice(0, 10);
    return recentClients.map(client => html`
      <div class="client-item" @click="${(e) => this.navigateToClientDetails(e, client)}">
        <div class="client-avatar"></div>
        <h4>${client.name}</h4>
      </div>
    `);
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

// Register the Home component as 'my-home'
customElements.define('my-home', Home);

export default Home;
