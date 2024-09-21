import { html, LitElement, css } from 'lit';
import { sharedStyles } from '/src/styles/shared-styles';  // Import the shared styles
import { ViewBase } from './ViewBase.js'; // Import the ViewBase class

class About extends ViewBase {
  static styles = [
    sharedStyles,
    css`
      .container {
      border: 1px solid blue;
      }
    `
  ]
  render() {
    return html`
      <div class="container">
        <h2>About Us</h2>
        <p>This is the about page of the LitHTML web app!</p>
        <a href="#" @click="${(e) => this.goBack(e)}">Go back</a>
      </div>
    `;
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();  // Navigate back to the previous page
  }
}
customElements.define('my-about', About);

export default About;
