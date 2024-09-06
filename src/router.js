import { LoginView } from './views/login-view.js';
import { LandingView } from './views/landing-view.js';

class Router {
  static routes = [
    {
      name: 'login',
      path: '/login',
      component: 'login-view',
      requiresAuth: false,
      preNavigate: () => {},
      postNavigate: () => {}
    },
    {
      name: 'landing',
      path: '/landing',
      component: 'landing-view',
      requiresAuth: true,
      preNavigate: () => {},
      postNavigate: () => {}
    }
  ];

  static currentView = Router.routes[0]; // Default to the login view

  static init() {
    window.addEventListener('popstate', () => Router.handleRouteChange(window.location.pathname));
    Router.handleRouteChange(window.location.pathname);
  }

  static getCurrentView() {
    return Router.currentView;
  }

  static navigateTo(path) {
    const route = Router.routes.find(r => r.path === path);
    if (route) {
      Router.currentView = route;
      Router.handleRouteChange(path);
      history.pushState(null, '', path);
    }
  }

  static handleRouteChange(path) {
    const route = Router.routes.find(r => r.path === path);
    if (route) {
      Router.currentView = route;
      // Debugging statement
      console.log('Handling route change to:', path);
      requestAnimationFrame(() => {
        const body = document.querySelector('app-body');
        if (body) {
          console.log('Found app-body:', body); // Debugging statement
          body.view = route;
        } else {
          console.error('app-body not found in DOM'); // Debugging statement
        }
      });
      route.preNavigate();
      route.postNavigate();
    }
  }
}

export { Router };
