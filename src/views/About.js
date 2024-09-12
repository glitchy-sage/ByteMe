import { html, render } from 'lit-html';

class About {
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

export default About;
