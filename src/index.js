import './app.js';
import { Router } from './router.js';

console.log('Initializing Router...');

// Initialize the router
Router.init();
Router.navigateTo('/login'); // Ensure the initial view is set
