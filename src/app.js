import { html, render } from 'lit-html';
import { router } from './Routing';
import './views/Login';
import './views/Home';

export class App {
  init() {
    router.navigate('/login'); // Set default route to login page
  }
}
