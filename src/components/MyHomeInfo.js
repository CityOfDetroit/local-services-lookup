'use strict';
import Display from './Display';
import Geocoder from './Geocoder';
import DataLoader from './DataLoader';
import NavigationTools from './NavigationTools';
customElements.define('app-display', Display);
customElements.define('app-geocoder', Geocoder);
customElements.define('app-data-loader', DataLoader);
customElements.define('app-nav-tools', NavigationTools);

export default class MyHomeInfo extends HTMLElement {
    static get observedAttributes() {
        return ['data-app-state', 'data-parcel-id', 'data-active-sets', 'data-active-section', 'data-api-datasets'];
    }

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create result section
        const appWrapper = document.createElement('section');
        appWrapper.id = 'app-wrapper';
        const display = document.createElement('app-display');
        display.setAttribute('data-display-type', 'welcome');
        appWrapper.appendChild(display);
        shadow.appendChild(appWrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;
        console.log(`App - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-app-state':
                if(oldValue != null){
                    this.clearApp(this);
                    this.loadApp(this);
                }
                break;

            case 'data-parcel-id':
                if(newValue != 'none'){
                    this.setAttribute('data-app-state', 'loading-screen');
                }else{
                    this.setAttribute('data-app-state', 'welcome-screen');
                }
                break;

            case 'data-api-datasets':
                if(newValue != 'none'){
                    this.setAttribute('data-app-state', 'results');
                }
                break;
        
            default:
                break;
        }
    }

    clearApp(app) {
        console.log('clearing app');
        const shadow = app.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadApp(app) {
        const shadow = app.shadowRoot;
        const appWrapper = document.createElement('section');
        appWrapper.id = 'app-wrapper';
        const display = document.createElement('app-display');
        const geocoder = document.createElement('app-geocoder');
        const dataLoader = document.createElement('app-data-loader');
        const navTools = document.createElement('app-nav-tools');
        switch (app.getAttribute('data-app-state')) {
            case 'welcome-screen':
                display.setAttribute('data-display-type', 'welcome');
                appWrapper.appendChild(display);
                break;

            case 'active-screen':
                display.setAttribute('data-display-type', 'active');
                appWrapper.appendChild(display);
                appWrapper.appendChild(geocoder);
                break;

            case 'loading-screen':
                display.setAttribute('data-display-type', 'loading');
                dataLoader.setAttribute('data-loader-state', 'active');
                appWrapper.appendChild(display);
                appWrapper.appendChild(dataLoader);
                break;

            case 'results':
                display.setAttribute('data-display-type', 'results');
                appWrapper.appendChild(navTools);
                appWrapper.appendChild(display);
                break;
        
            default:
                break;
        }
        shadow.appendChild(appWrapper);
    }
}
