import { LitElement } from 'lit';
import { router } from '/src/Routing';

export class ViewBase extends LitElement {
  constructor() {
    super();
  }

  // Shared method to handle back button click
  goBack() {
    console.log('Back button clicked');
    window.history.back(); // Example logic for back navigation
  }
}
