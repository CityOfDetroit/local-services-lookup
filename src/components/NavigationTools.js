'use strict';
import homeImage from '../images/home.png';
import govImage from '../images/government.png';
export default class NavigationTools extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Creating display styles
        this.navToolsStyle = document.createElement('style');
        this.navToolsStyle.textContent = `
            #nav-tools-wrapper { display: flex; flex-direction: column;}
            button.clear { font-size: 1.25em; width: 2em; height: 2em; background-color: #FEB70D; cursor: pointer; border: none; }
            button.nav { width: 3em; height: 3em; border: none; cursor: pointer;background: #fff; }
            button.nav:hover { background-color: #e6e6e6; transition: all 500ms cubic-bezier(.64,.09,.08,1); }
            button.nav.active { background-color: #9fd5b3; }
            button.nav img { width: 100%; }
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
        const app = document.getElementsByTagName('my-home-info');
        console.log('loading navigation');
        const shadow = navTools.shadowRoot;
        shadow.appendChild(navTools.navToolsStyle);
        const navToolsWrapper = document.createElement('section');
        navToolsWrapper.id = 'nav-tools-wrapper';
        navToolsWrapper.setAttribute('role', 'navigation');
        navToolsWrapper.setAttribute('aria-label', 'Data Navigation');
        const clearResultsBtn = document.createElement('button');
        clearResultsBtn.className = 'clear';
        clearResultsBtn.innerText = 'x';
        clearResultsBtn.addEventListener('click', (ev) => {
            app[0].setAttribute('data-app-state', 'welcome-screen');
            app[0].setAttribute('data-parcel-id', 'none');
            app[0].setAttribute('data-api-stored-datasets', '{}');
            app[0].setAttribute('data-api-active-datasets', 'none');
            app[0].setAttribute('data-active-sets', 'assessors-data,neighborhood');
            app[0].setAttribute('data-active-section', 'property');
        });
        navToolsWrapper.appendChild(clearResultsBtn);
        const propertyDataBtn = document.createElement('button');
        const homeIcon = document.createElement('img');
        homeIcon.src = homeImage;
        homeIcon.setAttribute('alt', 'property data');
        propertyDataBtn.setAttribute('data-nav-value', 'property');
        propertyDataBtn.appendChild(homeIcon);
        if(app[0].getAttribute('data-active-section') == 'property'){
            propertyDataBtn.className = 'nav active';
        }else{
            propertyDataBtn.className = 'nav';
            propertyDataBtn.addEventListener('click', (ev) => {
                if(app[0].getAttribute('data-api-active-datasets') != 'none'){
                    let storedData = JSON.parse(app[0].getAttribute('data-api-stored-datasets'));
                    let activeData = JSON.parse(app[0].getAttribute('data-api-active-datasets'));
                    for (const key in activeData) {
                        if(!(key in storedData)){
                            storedData[key] = activeData[key];
                        }
                    }
                    app[0].setAttribute('data-api-stored-datasets', JSON.stringify(storedData));
                }
                app[0].setAttribute('data-api-active-datasets', 'none');
                app[0].setAttribute('data-active-sets', 'assessors-data,neighborhood');
                app[0].setAttribute('data-active-section', 'property');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        navToolsWrapper.appendChild(propertyDataBtn);
        const govDataBtn = document.createElement('button');
        const govIcon = document.createElement('img');
        govIcon.src = govImage;
        govIcon.setAttribute('alt', 'government data');
        govDataBtn.setAttribute('data-nav-value', 'government');
        if(app[0].getAttribute('data-active-section') == 'government'){
            govDataBtn.className = 'nav active';
        }else{
            govDataBtn.className = 'nav';
            govDataBtn.addEventListener('click', (ev) => {
                if(app[0].getAttribute('data-api-active-datasets') != 'none'){
                    let storedData = JSON.parse(app[0].getAttribute('data-api-stored-datasets'));
                    let activeData = JSON.parse(app[0].getAttribute('data-api-active-datasets'));
                    for (const key in activeData) {
                        if(!(key in storedData)){
                            storedData[key] = activeData[key];
                        }
                    }
                    app[0].setAttribute('data-api-stored-datasets', JSON.stringify(storedData));
                }
                app[0].setAttribute('data-api-active-datasets', 'none');
                app[0].setAttribute('data-active-sets', 'council');
                app[0].setAttribute('data-active-section', 'government');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        govDataBtn.appendChild(govIcon);
        navToolsWrapper.appendChild(govDataBtn);
        shadow.appendChild(navToolsWrapper);
    }

}
