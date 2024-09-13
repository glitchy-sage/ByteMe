import { LitElement, html, css } from 'lit';
import '/src/components/CollapseComponent.js';  // Import CollapseComponent

class ClientDetails extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    h2 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 20px;
    }
  `;

  static properties = {
    sections: { type: String },  // String of section names to be passed
    clientName: { type: String }  // Client's name from the query string
  };

  constructor() {
    super();
    this.sections = 'General, Residency, Relationships, Other';  // Default sections
    this.clientName = '';
  }

  connectedCallback() {
    super.connectedCallback();
    // Get the client name from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    this.clientName = urlParams.get('client');
  }

  render() {
    return html`
      <div>
        <h2>Client Details for ${this.clientName}</h2>
        <!-- Pass the sections to CollapseComponent -->
        <collapse-component sections="${this.sections}"></collapse-component>
      </div>
    `;
  }
}

customElements.define('my-client', ClientDetails);
