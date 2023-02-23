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
            #nav-tools-wrapper { display: flex; flex-direction: column;}
            button.clear { font-size: 1.25em; width: 2.5em; height: 2.5em; background-color: #FEB70D; cursor: pointer; border: none; }
            button.nav { width: 3.75em; height: 3.75em; border: none; cursor: pointer;background: #fff; }
            button.nav:hover { background-color: #e6e6e6; transition: all 500ms cubic-bezier(.64,.09,.08,1); }
            button.nav.active { background-color: #9fd5b3; }
            button.nav img { width: 100%; }
        `;

        // Start loading display content
        this.loadNavTools(this);
    }

    clearDisplay(display) {
        const shadow = display.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadNavTools(navTools) {
        const app = document.getElementsByTagName('my-home-info');
        const appStatus = app[0].getAttribute('data-app-state');
        const appMode = app[0].getAttribute('data-app-mode');
        const initialSets = app[0].getAttribute('data-inital-sets');
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
            if(app[0].getAttribute('data-app-mode') == 'my-home-info'){
                app[0].setAttribute('data-app-state', 'welcome-screen');
                app[0].setAttribute('data-active-sets', 'assessors-data,neighborhood,recycling,rental-data,rental-cert,demo-status,blight-data,permit-data,DWSDBackupProtection');
            }else{
                app[0].setAttribute('data-app-state', 'active-screen');
                app[0].setAttribute('data-active-sets', initialSets);
            }
            app[0].setAttribute('data-parcel-id', 'none');
            app[0].setAttribute('data-api-stored-datasets', '{}');
            app[0].setAttribute('data-api-active-datasets', 'none');
            app[0].setAttribute('data-active-section', 'property');
        });
        navToolsWrapper.appendChild(clearResultsBtn);
        if (appMode == 'my-home-info' && appStatus != 'error'){
        const propertyDataBtn = document.createElement('button');
        const homeIcon = document.createElement('img');
        homeIcon.src = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-01/home.png'; //homeImage;
        homeIcon.setAttribute('alt', 'about this property');
        propertyDataBtn.setAttribute('data-nav-value', 'about this property');
        propertyDataBtn.appendChild(homeIcon);
        if(app[0].getAttribute('data-active-section') == 'about this property'){
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
                app[0].setAttribute('data-active-sets', 'assessors-data,neighborhood,recycling,rental-data,rental-cert,demo-status,blight-data,permit-data,DWSDBackupProtection');
                app[0].setAttribute('data-map-available', 'false');
                app[0].setAttribute('data-active-section', 'about this property');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        navToolsWrapper.appendChild(propertyDataBtn);

        const govDataBtn = document.createElement('button');
        const govIcon = document.createElement('img');
        govIcon.src = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-01/government.png'; //govImage;
        govIcon.setAttribute('alt', 'government officials');
        govDataBtn.setAttribute('data-nav-value', 'government officials');
        if(app[0].getAttribute('data-active-section') == 'government officials'){
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
                app[0].setAttribute('data-active-sets', 'council,council-members,district-managers,business-liaison,district-inspectors,npo');
                app[0].setAttribute('data-map-available', 'false');
                app[0].setAttribute('data-active-section', 'government officials');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        govDataBtn.appendChild(govIcon);
        navToolsWrapper.appendChild(govDataBtn);

        const zoneDataBtn = document.createElement('button');
        const zoneIcon = document.createElement('img');
        zoneIcon.src = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-01/zone.png'; //zoneImage;
        zoneIcon.setAttribute('alt', 'special areas and zones');
        zoneDataBtn.setAttribute('data-nav-value', 'special areas and zones');
        if(app[0].getAttribute('data-active-section') == 'special areas and zones'){
            zoneDataBtn.className = 'nav active';
        }else{
            zoneDataBtn.className = 'nav';
            zoneDataBtn.addEventListener('click', (ev) => {
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
                app[0].setAttribute('data-active-sets', 'nez,nrsa,historicDistrict');
                app[0].setAttribute('data-map-available', 'false');
                app[0].setAttribute('data-active-section', 'special areas and zones');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        zoneDataBtn.appendChild(zoneIcon);
        navToolsWrapper.appendChild(zoneDataBtn);
        
        const nearDataBtn = document.createElement('button');
        const nearIcon = document.createElement('img');
        nearIcon.src = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-01/nearby.png'; //nearImage;
        nearIcon.setAttribute('alt', 'things nearby');
        nearDataBtn.setAttribute('data-nav-value', 'things nearby');
        if(app[0].getAttribute('data-active-section') == 'things nearby'){
            nearDataBtn.className = 'nav active';
        }else{
            nearDataBtn.className = 'nav';
            nearDataBtn.addEventListener('click', (ev) => {
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
                app[0].setAttribute('data-active-sets', 'schools,demos-data,stabilization-data,improve-det');
                app[0].setAttribute('data-active-section', 'things nearby');
                app[0].setAttribute('data-map-available', 'true');
                app[0].setAttribute('data-app-state', 'loading-screen');
            });
        }
        nearDataBtn.appendChild(nearIcon);
        navToolsWrapper.appendChild(nearDataBtn);

        const printBtn = document.createElement('button');
        const printIcon = document.createElement('img');
        printIcon.src = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-01/print.png'; //printImage;
        printIcon.setAttribute('alt', 'print');
        printBtn.setAttribute('data-nav-value', 'print');
        if(app[0].getAttribute('data-active-section') == 'print'){
            nearDataBtn.className = 'nav active';
        }else{
            printBtn.className = 'nav';
            printBtn.addEventListener('click', () => {
                app[0].setAttribute('data-app-state', 'print');
            });
        }
        printBtn.appendChild(printIcon);
        navToolsWrapper.appendChild(printBtn);
        }

        shadow.appendChild(navToolsWrapper);
    }

}
