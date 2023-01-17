'use strict';
import Display from './Display';
import DataLoader from './DataLoader';
customElements.define('app-display', Display);
customElements.define('app-data-loader', DataLoader);

export default class MyHomeInfo extends HTMLElement {
    static get observedAttributes() {
        return ['data-app-state', 'data-parcel-id'];
        // , 'data-active-sets', 'data-active-section', 'data-api-active-datasets'
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

            // case 'data-api-active-datasets':
            //     if(newValue != 'none'){
            //         this.setAttribute('data-app-state', 'results');
            //     }
            //     break;

            // case 'data-active-sets':
            //     break;

            // case 'data-active-section':
            //     if(newValue != 'none' && (this.getAttribute('data-parcel-id') != 'none')){
            //         this.setAttribute('data-app-state', 'loading-screen');
            //     }
            //     break;
        
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

    printInfo() {
        let app = document.getElementsByTagName('my-home-info');
        let appShadow = app[0].shadowRoot;
        console.log(appShadow);
        let display = appShadow.querySelector('app-display');
        let displayShadow = display[0].shadowRoot;
        let divContents = displayShadow.querySelector('.dataset-results').innerHTML;
        console.log(divContents);
        let a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<head><style>@media print {.noprint { visibility: hidden;}; .local-content {column-count: 3;} }</style></head>');
        a.document.write('<body >');
        a.document.write(divContents);
        a.document.write('</body>');
        a.document.close();
        a.print();
    }

    loadApp(app) {
        const shadow = app.shadowRoot;
        const appWrapper = document.createElement('section');
        appWrapper.id = 'app-wrapper';
        const display = document.createElement('app-display');
        const dataLoader = document.createElement('app-data-loader');
        switch (app.getAttribute('data-app-state')) {
            case 'welcome-screen':
                display.setAttribute('data-display-type', 'welcome');
                appWrapper.appendChild(display);
                break;

            case 'active-screen':
                display.setAttribute('data-display-type', 'active');
                appWrapper.appendChild(display);
                break;

            case 'loading-screen':
                display.setAttribute('data-display-type', 'loading');
                dataLoader.setAttribute('data-loader-state', 'active');
                appWrapper.appendChild(display);
                break;

            case 'results':
                display.setAttribute('data-display-type', 'results');
                appWrapper.appendChild(display);
                break;
        
            default:
                break;
        }
        console.log(shadow.firstChild);
        if(shadow.firstChild == null){
            shadow.appendChild(appWrapper);
        }
    }
}
