import { html, LitElement, css } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';  // Import the shared styles
import { ClientData } from '/src/models/ClientData'; // Importing the client data

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
    }

    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
      color: #333;
    }

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      font-size: 1.1rem;
    }

    .section-title span {
      font-size: 1.5rem;
      cursor: pointer;
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

    .client-button {
      padding: 10px 20px;
      background-color: #5e3c87;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 1rem;
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
    `
  ];

  // Navigate to ClientDetails page with the selected client name as a query parameter
  navigateToClientDetails(event, clientName) {
    // window.location.href = `/client-details?client=${encodeURIComponent(clientName)}`;
    console.log("clieent name: " + clientName);
    event.preventDefault();
    router.navigate('/client');
  }

  render() {
    return html`
<div class="home-container">
        <h2>Byte Me</h2>

        <!-- Search Client Section -->
        <div class="section-title">
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
          <button class="client-button">New Client</button>
          <button class="client-button">Existing Client</button>
        </div>

        <!-- Recent Clients Section -->
        <div class="section-title">
          <h3>Recent clients</h3>
          <span>→</span>
        </div>

        <div class="recent-clients">
          ${this.renderRecentClients()}
        </div>

        <!-- Documents Section -->
        <div class="section-title">
          <h3>Documents</h3>
          <span>→</span>
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
    return ClientData.recentClients.map(client => html`
      <div class="client-item" @click="${(e) => this.navigateToClientDetails(e, client.name)}">
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
