'use strict';

export default class DataLoader extends HTMLElement {
    static get observedAttributes() {
        return ['data-loader-state','data-api', 'data-parcel-id'];
    }

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create result section
        const loaderWrapper = document.createElement('section');
        loaderWrapper.id = 'loader-wrapper';
        shadow.appendChild(loaderWrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;
        console.log(`Loader - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-loader-state':
                if(oldValue != null){
                    this.clearLoader(this);
                    this.loadLoader(this);
                }
                break;

            case 'data-parcel-id':
                if(newValue != 'none'){
                    this.setAttribute('data-loader-state', 'active');
                }else{
                    this.setAttribute('data-loader-state', 'waiting');
                }
                break;

            
        
            default:
                break;
        }
    }

    getData(loader) {
        const app = document.getElementsByTagName('my-home-info');
        const data = JSON.parse(app[0].getAttribute('data-parcel-id'));
        console.log(data);
        let assessorsData = new Promise((resolve, reject) => {
            if(location.attributes.parcel_id == 'CONDO BUILDING'){
              resolve({"id": "assessors-data", "data": null});
            }else{
              let url = "https://apis.detroitmi.gov/assessments/parcel/" + location.attributes.parcel_id + "/";
              return fetch(url)
              .then((resp) => resp.json()) // Transform the data into json
              .then(function(data) {
                resolve({"id": "assessors-data", "data": data});
              }).catch( err => {
                // console.log(err);
              });
            }
        });
    }

    clearLoader(loader) {
        console.log('clearing loader');
        const shadow = loader.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadLoader(loader) {
        const shadow = loader.shadowRoot;
        const loaderWrapper = document.createElement('section');
        loaderWrapper.id = 'loader-wrapper';
        switch (loader.getAttribute('data-loader-state')) {
            case 'active':
                loader.getData(loader);
                const textWelcome = document.createElement('p');
                textWelcome.innerText = 'Loading DATA';
                textWrapperWelcome.appendChild(textWelcome);
                shadow.appendChild(displayWrapper);
                break;
        
            default:
                break;
        }
        shadow.appendChild(loaderWrapper);
    }
}
