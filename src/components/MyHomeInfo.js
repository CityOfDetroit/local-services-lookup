'use strict';
import Display from './Display';
import Geocoder from './Geocoder';
customElements.define('app-display', Display);
customElements.define('app-geocoder', Geocoder);

export default class MyHomeInfo extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Get current setup
        const dataAvailable = document.getElementById('active-data').value.split(',');

        // Create result section
        const appWrapper = document.createElement('section');
        const geocoder = document.createElement('app-geocoder');
        shadow.appendChild(geocoder);
        const display = document.createElement('app-display');
        shadow.appendChild(display);
    }
}
