'use strict';

export default class Display extends HTMLElement {
    static get observedAttributes() {
        return ['data-display-type'];
    }

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create result section
        const displayWrapper = document.createElement('section');
        displayWrapper.id = 'display-wrapper';
        console.log('adding text');
        const text = document.createElement('p');
        text.innerText = 'welcome screen';
        displayWrapper.appendChild(text)
        const btn = document.createElement('button');
        btn.innerText = 'Start';
        btn.addEventListener('click', (ev)=>{
            console.log(ev);
            const app = document.getElementsByTagName('my-home-info');
            console.log(app[0]);
            app[0].setAttribute('data-app-state', 'active-screen');
        })
        displayWrapper.appendChild(btn)
        shadow.appendChild(displayWrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        this.loadDisplay(this);
    }

    clearDisplay(display) {
        console.log('clearing display');
        const shadow = display.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    loadDisplay(display) {
        const shadow = display.shadowRoot;
        const displayWrapper = document.createElement('section');
        displayWrapper.id = 'display-wrapper';
        switch (this.getAttribute('data-display-type')) {
            case 'welcome-screen':
                const text = document.createElement('p');
                text.innerText = 'welcome screen';
                displayWrapper.appendChild(text);
                shadow.appendChild(displayWrapper);
                break;

            case 'active':
                break;

            case 'loading':
                const loadingScreen = document.createElement('article');
                loadingScreen.innerHTML = `
                <article class="loader-container">
                    <article>
                    <div class="loader">
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__ball"></div>
                    </div>
                    <p>LOADING</p>
                    </article>
                </article>`;
                displayWrapper.appendChild(loadingScreen);
                shadow.appendChild(loadingScreen);
                break;

            case 'results':
                const results = document.createElement('p');
                results.innerText = 'results screen';
                displayWrapper.appendChild(results);
                shadow.appendChild(displayWrapper);
                break;
        
            default:
                break;
        }
    }

}
