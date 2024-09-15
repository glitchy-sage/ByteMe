import { html, css } from 'lit';
import { router } from '/src/Routing';
import { sharedStyles } from '/src/styles/shared-styles';  // Import the shared styles
import { ViewBase } from '../ViewBase.js'; // Import the ViewBase class

class ClientList extends ViewBase {
  static styles = [
    sharedStyles,
    css`
    :host {
      display: block;
      padding: 20px;
    }
    .client-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .client-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .client-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #f4e9f7;
      margin-right: 20px;
    }

    .client-details {
      flex: 1;
    }

    .client-name {
      font-size: 1.2rem;
      margin: 0;
      color: #5e3c87;
    }

    .client-description {
      font-size: 0.9rem;
      color: #777;
      margin: 5px 0 10px 0;
    }

    .client-tags {
      display: flex;
      gap: 10px;
    }

    .tag {
      background-color: #5e3c87;
      color: white;
      border-radius: 20px;
      padding: 5px 10px;
      font-size: 0.8rem;
    }
  `];

  static properties = {
    clients: { type: Array }
  };

  constructor() {
    super();
    // Default client data
    this.clients = [
      {
        name: 'Dylan Barnard',
        description: 'A financial advisor with a focus on retirement planning.',
        tags: ['Finance', 'Retirement', 'Advisor']
      },
      {
        name: 'Candice Yeatman',
        description: 'Specializes in investment strategies for high net-worth individuals.',
        tags: ['Investment', 'High Net-Worth']
      },
      {
        name: 'John Doe',
        description: 'Expert in tax consulting and financial planning.',
        tags: ['Tax', 'Consulting']
      },
      // Add more clients here
    ];
  }

  viewProfile(clientName) {
    router.navigate('/summary');
  }

  renderClientCard(client) {
    return html`
      <div class="client-card">
        <div class="client-image"></div>
        <div class="client-details">
          <h3 class="client-name">${client.name}</h3>
          <p class="client-description">${client.description}</p>
          <div class="client-tags">
            ${client.tags.map(tag => html`<span class="tag">${tag}</span>`)}
          </div>
        </div>
        <button class="my-button" @click="${() => this.viewProfile(client.name)}">View Profile</button>
      </div>
    `;
  }

  render() {
    return html`
      <div class="client-list-container">
        <div class="header">
          <button class="back-button" @click="${(e) => this.goBack(e)}">←</button>
          <h2>Client List</h2>
        </div>
        <div class="client-list">
          ${this.clients.map(client => this.renderClientCard(client))}
        </div>
      </div>
    `;
  }
}

customElements.define('my-list', ClientList);
