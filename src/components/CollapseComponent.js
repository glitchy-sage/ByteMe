import { LitElement, html, css } from 'lit';

class CollapseComponent extends LitElement {
  static styles = css`
    .group {
      border: 1px solid #ddd;
      margin: 15px 0;
      padding: 10px;
      cursor: pointer;
      background-color: #f8f9fa;
      border-radius: 5px;
    }

    .group h3 {
      margin: 0;
      font-size: 1.25rem;
      // color: #007bff;
      font-weight: 500;
    }

    .content {
      padding: 10px;
      // background-color: #fff;
      display: none;
      border-top: 1px solid #ddd;
    }

    .expanded .content {
      display: block;
    }
  `;

  static properties = {
    header: { type: String }, 
    expanded: { type: Boolean }
  };

  constructor() {
    super();
    this.header = "";  
    this.expanded = false;
  }

  // Toggle method for collapsing/expanding
  toggleGroup(e) {
    // Prevent propagation to inner elements like dropdowns
    if (e.target.tagName !== 'SELECT') {
      this.expanded = !this.expanded;
    }
  }

  render() {
    return html`
      <div class="group ${this.expanded ? 'expanded' : ''}" @click="${this.toggleGroup}">
        <h3>${this.header}</h3>
        <!-- Stop the click event from propagating from inside the content -->
        <div class="content" @click="${e => e.stopPropagation()}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('collapse-component', CollapseComponent);
