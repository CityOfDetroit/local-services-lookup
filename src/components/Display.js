'use strict';

export default class Display extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create result section
        const displayWrapper = document.createElement('section');
        displayWrapper.id = 'app-display';
        const geocoder = document.createElement('app-geocoder');
        const resultsWrapper = document.createElement('section');
        resultsWrapper.id = 'data-results';
        shadow.appendChild(geocoder);
    }
}
