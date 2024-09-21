import { Platform } from './core/Platform';
import { Router } from './core/Router';
import { Shell } from '/src/elements';
import { html, css } from 'lit';
import { AppStore } from '/src/store/AppStore';
// import 'platform/components';

/**
 * Entry-point of the application, based on a platform-provided base class.
 * 
 */
export class AppShell extends Shell {

    // --------------
    // INITIALISATION
    // --------------

    constructor() {

        super();

        // The below method call serves two functions:
        //   1. Initialise the runtime configuration.
        //   2. Initialise the authentication flow, which includes obtaining an identity token from one of the trusted IDPs. 
        // 
        // NOTE: This method call is only required once within the context of the application, but as early as possible.
        Platform.init({ security: false });

        // Platform Non-UI Components.
        this._appStore = AppStore.getInstance();
        this._router = Router.getInstance();

        // Setup Routing paths.
        this._menu = [
            this._router.addRoute({
                name: `view-login`,
                title: `Sign In`,
                icon: `material/home`,
                path: `/login`,
                load: () => import(`./views/Login`),
                isDefault: true,
                isFallback: true
            }),
            this._router.addRoute({
                name: `view-forgot-password`,
                title: `Forgot Password`,
                icon: `material/home`,
                path: `/forgot-password`,
                load: () => import(`./views/Home`),
                isDefault: false,
                isFallback: true
            }),
            {
                title: `Help`,
                icon: `material/extension`,
                items: [
                    this._router.addRoute({
                        name: `view-about`,
                        title: `About Capitec`,
                        path: `/help/about`,
                        load: () => import(`./views/help/About`)
                    }),
                    this._router.addRoute({
                        name: `view-settings`,
                        title: `Settings`,
                        path: `/help/settings`,
                        load: () => import(`./views/help/Settings`)
                    })
                ]
            }
        ];

        // Property defaults.
        this.isBusy = true;
    }

    // ----------
    // PROPERTIES
    // ----------

    static get properties() {

        return {
            isBusy: { type: Boolean }
        };
    }

    // -------------------
    // LIFECYCLE OVERRIDES
    // -------------------

    connectedCallback() {

        super.connectedCallback();

        this.isBusy = false;

        // Subscribe to store.
        this._appStoreSub = this._appStore.stateChanged.subscribe(state => {

            if (!state) {
                return;
            }

            this.isBusy = state.isReady;
        });
    }

    disconnectedCallback() {

        // Unsubscribe from store.
        this._appStoreSub.unsubscribe();
    }

    // --------------
    // EVENT HANDLERS
    // --------------

    // n/a


    // --------------
    // PUBLIC METHODS
    // --------------

    // n/a

    // ---------------
    // PRIVATE METHODS
    // ---------------

    // n/a

    // ---------
    // RENDERING
    // ---------

    /**
     * Generates the component stylesheet.
     *
     * @readonly
     * @static
     * @returns {css} CSS for the component.
     */
    static get styles() {
        return [
            super.styles,
            css`

			`
        ];
    }

    // NOTE: Remove the below commented out code if *renderShell()* is sufficient to use.

    /**
     * Rendering method for "desktop" application type only.
     * 
     * NOTE: Please ensure to also specify *_mobileTemplate()* method, 
     * if required to support mobile device detection, 
     * which is enabled by default.
     * 
     * @returns {html} "desktop" rendering template method.
     */
    _webTemplate() {

        return html`
              <div class="container">
        <h2>Login</h2>
        <form @submit="${this.handleLogin}">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p><a href="#" @click="${(e) => this.goToAbout(e)}">Learn more about us</a></p>
      </div>

		`;
    }

    /**
     * Rendering method for "kiosk" application type only.
     * 
     * @returns {html} "kiosk" rendering template method.
     */
    _kioskTemplate() {

        return html`${this._webTemplate()}`;
    }

    /**
     * Rendering method for "mobile" application type only.
     * 
     * @returns {html} "mobile" rendering template method.
     */
    _mobileTemplate() {
        return html`${this._webTemplate()}`;
    }
}

// Creation of custom element, must be called "app-shell" by convention, as expected by the platform.
window.customElements.define(`app-shell`, AppShell);