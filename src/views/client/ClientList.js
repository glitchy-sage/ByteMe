import { html, css } from 'lit';
import { router } from '/src/Routing';
import { sharedStyles } from '/src/styles/shared-styles';
import { ViewBase } from '../ViewBase.js';
import { store } from '/src/Store';
import { clients } from '/src/constants/ClientList';

class ClientList extends ViewBase {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        padding: 20px;
        overflow-y: auto;
        height: 100vh;
        box-sizing: border-box;
      }

      .client-list-container {
        max-width: 900px;
        margin: 0 auto;
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
        transition: transform 0.2s ease;
      }

      .client-card:hover {
        transform: translateY(-5px);
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
        flex-wrap: wrap;
      }

      .tag {
        background-color: #5e3c87;
        color: white;
        border-radius: 20px;
        padding: 5px 10px;
        font-size: 0.8rem;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      @media (max-width: 768px) {
        .client-card {
          flex-direction: column;
          text-align: center;
        }

        .client-image {
          margin-bottom: 10px;
        }

        .header {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ];

  static properties = {
    clients: { type: Array },
  };

  constructor() {
    super();
    this.clients = clients;
    this.filteredClients = this.clients;
  }

  connectedCallback() {
    super.connectedCallback();
    const searchParams = store.get('searchParams');

    if (searchParams) {
      const { name, id } = searchParams;
      this.filteredClients = this.clients.filter(
        (client) =>
          (name && client.name.toLowerCase().includes(name.toLowerCase())) ||
          (id && client.id && client.id.includes(id))
      );

      store.clear('searchParams');
    }
  }

  viewProfile(client) {
    store.set('clientInfo', { client });
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
            ${client.tags.map((tag) => html`<span class="tag">${tag}</span>`)}
          </div>
        </div>
        <button class="my-button" @click="${() => this.viewProfile(client)}">
          View Profile
        </button>
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
          ${this.filteredClients?.length > 0
            ? this.filteredClients.map((client) => this.renderClientCard(client))
            : html`<p>No clients found.</p>`}
        </div>
      </div>
    `;
  }
}

customElements.define('my-list', ClientList);
