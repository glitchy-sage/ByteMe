import { html, render } from 'lit-html';

class About {
  render() {
    const template = html`
      <div class="container">
        <h2>About Us</h2>
        <p>This is the about page of the LitHTML web app!</p>
        <a href="#" @click="${(e) => this.goBack(e)}">Go back</a>
      </div>
    `;
    render(template, document.getElementById('app'));
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();  // Navigate back to the previous page
  }
}

export default About;
