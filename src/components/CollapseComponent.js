import { LitElement, html, css } from 'lit';

class CollapseComponent extends LitElement {
  static styles = css`
    .collapse-section {
      border: 1px solid #ddd;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .section-header {
      padding: 10px;
      background-color: #f4e9f7;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
    }

    .section-content {
      padding: 10px;
      display: none;
      background-color: #fff;
    }

    .section-content.expanded {
      display: block;
    }
  `;

  static properties = {
    sections: { type: Array },  // Array to hold section names
    expandedSections: { type: Array },  // Array to track expanded sections
  };

  constructor() {
    super();
    this.sections = [];
    this.expandedSections = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // Parse the sections from the HTML attribute
    const sectionData = this.getAttribute('sections');
    if (sectionData) {
      this.sections = sectionData.split(',').map(section => section.trim());
    }
  }

  toggleSection(index) {
    // Check if section is already expanded
    if (this.expandedSections.includes(index)) {
      this.expandedSections = this.expandedSections.filter(i => i !== index);
    } else {
      this.expandedSections = [...this.expandedSections, index];
    }
  }

  render() {
    return html`
      <div>
        ${this.sections.map((section, index) => html`
          <div class="collapse-section">
            <div class="section-header" @click="${() => this.toggleSection(index)}">
              ${section}
            </div>
            <div class="section-content ${this.expandedSections.includes(index) ? 'expanded' : ''}">
              <p>Details for ${section}</p> <!-- Placeholder for actual content -->
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('collapse-component', CollapseComponent);
