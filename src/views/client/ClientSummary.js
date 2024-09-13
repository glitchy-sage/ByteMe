import { LitElement, html, css } from 'lit';
import { router } from '/src/Routing';

class ClientSummary extends LitElement {
  static styles = css`
    /* Add the CSS styles from your original structure */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .client-profile-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .back-button {
      font-size: 24px;
      background: none;
      border: none;
      cursor: pointer;
      margin-right: 10px;
    }

    h2 {
      margin: 0;
      font-size: 24px;
    }

    .profile-section {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }

    .profile-picture .placeholder {
      width: 100px;
      height: 100px;
      background-color: #e0e0e0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .profile-details {
      margin-left: 20px;
    }

    .profile-details h3 {
      margin: 0;
      font-size: 22px;
    }

    .profile-details p {
      margin: 5px 0;
    }

    .view-more-button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #5e3c87;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }

    .documents-section {
      margin-top: 30px;
    }

    .documents-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .documents-header h3 {
      margin: 0;
    }

    .documents-header .arrow {
      font-size: 24px;
      cursor: pointer;
    }

    .document-list {
      display: flex;
      flex-direction: column;
    }

    .document-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .document-icon .icon-placeholder {
      width: 50px;
      height: 50px;
      background-color: #e0e0e0;
      border-radius: 10px;
      margin-right: 15px;
    }

    .document-info h4 {
      margin: 0;
      font-size: 18px;
    }

    .document-info p {
      margin: 5px 0 0;
      color: #777;
    }
  `;

  // Navigate to the home page
  goToHome(event) {
    event.preventDefault();
    router.navigate('/home');
  }

  goToMore(event) {
    event.preventDefault();
    router.navigate('/client'); 
  }

  render() {
    return html`
      <div class="client-profile-container">
        
        <!-- Header and Back Button -->
        <div class="header">
          <button class="back-button" @click="${(e) => this.goToHome(e)}">←</button>
          <h2>Client Profile</h2>
        </div>

        <!-- Profile Section -->
        <div class="profile-section">
          <div class="profile-picture">
            <!-- Placeholder for profile picture -->
            <div class="placeholder"></div>
          </div>
          <div class="profile-details">
            <h3>Dylan Barnard</h3>
            <p><strong>ID Number:</strong> 9709240106084</p>
            <p><strong>Language:</strong> English</p>
            <button class="view-more-button" @click="${(e) => this.goToMore(e)}">View More</button>
          </div>
        </div>

        <!-- Documents Section -->
        <div class="documents-section">
          <div class="documents-header">
            <h3>Documents</h3>
            <span class="arrow" @click="${this.goToHome}">→</span>
          </div>
          
          <!-- Document List -->
          <div class="document-list">
            <!-- Document Item 1 -->
            <div class="document-item">
              <div class="document-icon">
                <div class="icon-placeholder"></div>
              </div>
              <div class="document-info">
                <h4>New Meeting</h4>
                <p>Create reports and notes during your meeting</p>
              </div>
            </div>

            <!-- Document Item 2 -->
            <div class="document-item">
              <div class="document-icon">
                <div class="icon-placeholder"></div>
              </div>
              <div class="document-info">
                <h4>Update Details</h4>
                <p>Description duis aute irure dolor in reprehenderit in voluptate velit.</p>
              </div>
            </div>

            <!-- Document Item 3 -->
            <div class="document-item">
              <div class="document-icon">
                <div class="icon-placeholder"></div>
              </div>
              <div class="document-info">
                <h4>Another Option</h4>
                <p>Description duis aute irure dolor in reprehenderit in voluptate velit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('my-summary', ClientSummary);
