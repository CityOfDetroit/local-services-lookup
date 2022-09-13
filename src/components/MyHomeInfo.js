'use strict';
import Display from './Display';
import Geocoder from './Geocoder';
customElements.define('app-display', Display);
customElements.define('app-geocoder', Geocoder);

export default class MyHomeInfo extends HTMLElement {
    static get observedAttributes() {
        return ['data-app-state', 'data-parcel-id'];
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
        console.log(`attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-app-state':
                if(oldValue != null){
                    this.clearApp(this);
                    this.loadApp(this);
                }
                break;

            case 'data-parcel-id':
                if(oldValue != null){
                    this.setAttribute('data-app-state', 'results');
                }else{
                    this.setAttribute('data-app-state', 'active-screen');
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
        switch (app.getAttribute('data-app-state')) {
            case 'welcome-screen':
                display.setAttribute('data-display-type', 'welcome');
                appWrapper.appendChild(display);
                break;

            case 'active-screen':
                const geocoder = document.createElement('app-geocoder');
                appWrapper.appendChild(geocoder);
                break;

            case 'results':
                display.setAttribute('data-display-type', 'results');
                appWrapper.appendChild(display);
                break;
        
            default:
                break;
        }
        shadow.appendChild(appWrapper);
    }
}
