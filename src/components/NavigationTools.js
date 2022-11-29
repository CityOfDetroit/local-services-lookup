'use strict';
export default class NavigationTools extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Creating display styles
        this.navToolsStyle = document.createElement('style');
        this.navToolsStyle.textContent = `
            #display-wrapper { display: flex; padding: 1em; flex-wrap: wrap;}
            #display-wrapper > img { max-width: 100%; }
            #display-wrapper p { text-align: center; }
            #display-wrapper button { padding: 1em 2em;  background-color: #004445; color: #fff; border: none; cursor: pointer }
            p.display-title { font-weight: bold; font-size: 1.25em; }
            #data-results{ width: 100%}
        `;

        // Start loading display content
        this.loadNavTools(this);
    }

    clearDisplay(display) {
        console.log('clearing nav tools');
        const shadow = display.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadNavTools(navTools) {
        console.log('loading navigation');
        const shadow = navTools.shadowRoot;
        const navToolsWrapper = document.createElement('section');
        navToolsWrapper.id = 'nav-tools-wrapper';
        const clearResultsBtn = document.createElement('button');
        clearResultsBtn.innerText = 'x';
        clearResultsBtn.addEventListener((ev) => {
            const app = document.getElementsByTagName('my-home-info');
            app[0].setAttribute('data-app-state', 'welcome-screen');
            app[0].setAttribute('data-parcel-id', 'none');
            app[0].setAttribute('data-api-datasets', 'none');
            app[0].setAttribute('data-active-section', 'property');
            app[0].setAttribute('data-active-sets', 'assessors-data,neighborhood');
        });
        navToolsWrapper.appendChild(clearResultsBtn);
        shadow.appendChild(navToolsWrapper);
    }

}
