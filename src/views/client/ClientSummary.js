import { LitElement, html, css } from 'lit';
import { router } from '/src/Routing';
import { ViewBase } from '../ViewBase.js'; // Import the ViewBase class
import { sharedStyles } from '../../styles/shared-styles.js';
import { encodedPDF } from '/src/models/PDF';
import '/src/components/PDFViewer';

class ClientSummary extends ViewBase {
    static styles = [
        sharedStyles,
        css`
            body {
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            }

            .client-profile-container {
            margin: 0 auto;
            padding: 20px;
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
            background-color: rgb(255, 255, 255);
            padding: 20px;
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

            /* New client information section */
            .info-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 40px;
            }

            .info-group {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            }

            .info-item {
            margin-bottom: 0.5rem;
            }

            .info-item strong {
            font-weight: 600;
            }

            /* Documents Section */
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

            /* Status Icon Styles */
            .status-icon {
            width: 12px;
            height: 12px;
            background-color: green;
            border-radius: 50%;
            margin-left: 10px;
            }

            .document-item:hover {
            cursor: pointer;
            }

            /* Popup Styles */
            .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            }

            .popup-overlay.show {
            display: flex;
            }

            .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            }

            .popup-content h3 {
            margin-top: 0;
            }

            .checkbox-list {
            margin-bottom: 20px;
            }

            .checkbox-item {
            margin-bottom: 10px;
            }

            .next-button {
            background-color: #5e3c87;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            }

            .next-button:hover {
            background-color: #462b68;
            }
        `];

    static properties = {
        dob: { type: String },
        language: { type: String },
        company: { type: String },
        entityType: { type: String },
        status: { type: String },
        office: { type: String },
        showPopup: { type: Boolean },
        showPdf: { type: Boolean }
    };

    constructor() {
        super();
        this.showPopup = false;
        this.showPdf = false;
        this.dob = `2010/09/14`;
        this.age = `43`;
        this.language = `English`;
        this.company = `Morebo`;
        this.entityType = `Natural person`;
        this.status = `Potential client`;
        this.office = `Morebo wealth`;
    }

    goToMore(event) {
        event.preventDefault();
        router.navigate('/client');
    }

    // Method to toggle popup visibility
    togglePopup() {
        this.showPopup = !this.showPopup;
    }

    // Method to navigate to ClientDetails screen
    populatePDF() {
        this.togglePopup(); // Close popup first
        this.showPdf = true;
        // router.navigate('/client'); // Navigate to ClientDetails.js screen
    }
    _renderModal() {
        return this.showPopup
            ? html`
     <div class="popup-overlay ${this.showPopup ? 'show' : ''}">
          <div class="popup-content">
            <h3>Select Options</h3>
            <div class="checkbox-list">
              <div class="checkbox-item">
                <input type="checkbox" id="option1" name="option1">
                <label for="option1">Option 1</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="option2" name="option2">
                <label for="option2">Option 2</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="option3" name="option3">
                <label for="option3">Option 3</label>
              </div>
            </div>
            <button class="next-button" @click="${this.populatePDF}">Next</button>
            <button class="next-button" @click="${this.populatePDF}">New template</button>
          </div>
        </div>
    `
            : html``;
    }

    _renderPDF() {
        const base64PDF = encodedPDF;
        return this.showPdf
        ? html`
            <div class="popup-overlay ${this.showPdf ? 'show' : ''}">
             <pdf-viewer base64PDF=${base64PDF}></pdf-viewer>
            </div>
        `
        : html``;
    }

    render() {
        return html`
      <div class="client-profile-container">
        
        <!-- Header and Back Button -->
        <div class="header">
          <button class="back-button" @click="${(e) => this.goBack(e)}">←</button>
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
            <!-- New Information Section (Under the client name) -->
            <div class="info-container">
            <div class="info-group">
                <div class="info-item">
                <strong>Date of birth:</strong> ${this.dob}
                </div>
                <div class="info-item">
                <strong>Preferred language:</strong> ${this.language}
                </div>
                <div class="info-item">
                <strong>Entity type:</strong> ${this.entityType}
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                <strong>Age:</strong> ${this.age}
                </div>
                <div class="info-item">
                <strong>Status:</strong> ${this.status}
                </div>
                <div class="info-item">
                <strong>Company:</strong> ${this.company}
                </div>
            </div>
            </div>
            <button class="my-button" @click="${(e) => this.goToMore(e)}">View More</button>
        </div>
    </div>

    ${this._renderModal()}
    ${this._renderPDF()}
    
        <!-- Documents Section -->
        <div class="documents-section">
          <div class="documents-header">
            <h3>Documents</h3>
          </div>
          
          <!-- Document List -->
          <div class="document-list">
            <!-- Document Item 1 -->
            <div class="document-item" @click="${(e) => this.togglePopup(e)}">
              <div class="document-icon">
                <div class="icon-placeholder"></div>
              </div>
              <div class="document-info">
                <h4>Get PDF</h4>
                <p>Populate your PDF template with this clients information</p>
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
                <h4>New Meeting</h4>
                <p>Create reports and notes during your meeting</p>
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
