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
            button.clear { font-size: 1.25em; width: 2em; height: 2em; background-color: #FEB70D; cursor: pointer }
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
        shadow.appendChild(navTools.navToolsStyle);
        const navToolsWrapper = document.createElement('section');
        navToolsWrapper.id = 'nav-tools-wrapper';
        const clearResultsBtn = document.createElement('button');
        clearResultsBtn.className = 'clear';
        clearResultsBtn.innerText = 'x';
        clearResultsBtn.addEventListener('click', (ev) => {
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
