class Router {
    constructor(routes) {
        this.routes = routes;
        window.onpopstate = () => this.loadRoute();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute();
    }

    loadRoute() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes['/'];
        document.body.children[0].innerHTML = route.render();
    }
}

export default Router;
