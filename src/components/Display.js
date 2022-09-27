'use strict';
import neighborhoodImage from '../images/neighborhood.png';
export default class Display extends HTMLElement {
    static get observedAttributes() {
        return ['data-display-type'];
    }

    constructor() {
        // Always call super first in constructor
        super();
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Creating images
        this.neighborhoodImage = document.createElement('img');
        this.neighborhoodImage.src = neighborhoodImage;
        this.neighborhoodImage.setAttribute('alt', '');

        // Creating display styles
        this.welcomeStyle = document.createElement('style');
        this.welcomeStyle.textContent = `
            #display-wrapper { display: flex; padding: 1em; }
            #display-wrapper > img { max-width: 100%; }
            #display-wrapper p { text-align: center; }
            #display-wrapper button { padding: 1em 2em;  background-color: #004445; color: #fff; border: none; cursor: pointer }
            p.display-title { font-weight: bold; font-size: 1.25em; }
            
        `;

        // Start loading display content
        this.loadDisplay(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Display - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        if(newValue == 'results'){
            this.clearDisplay(this);
        }
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
            case 'welcome':
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(this.neighborhoodImage);
                const textWrapperWelcome = document.createElement('article');
                displayWrapper.appendChild(textWrapperWelcome);
                const titleWelcome = document.createElement('p');
                titleWelcome.setAttribute('aria-label', 'title');
                titleWelcome.innerText = 'It’s all here. All in one place.';
                titleWelcome.className = 'display-title';
                textWrapperWelcome.appendChild(titleWelcome)
                const textWelcome = document.createElement('p');
                textWelcome.innerText = 'Enter your home address to find out your city councilmember and neighborhood district manager, along with local information about trash/recycling, your neighborhood police officer, city issues reported in your neighborhood, and more.';
                textWrapperWelcome.appendChild(textWelcome)
                const btn = document.createElement('button');
                btn.innerText = 'Start';
                btn.addEventListener('click', (ev)=>{
                    console.log(ev);
                    const app = document.getElementsByTagName('my-home-info');
                    console.log(app[0]);
                    app[0].setAttribute('data-app-state', 'active-screen');
                })
                textWrapperWelcome.appendChild(btn)
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
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(this.neighborhoodImage);
                const textWrapperResults = document.createElement('article');
                displayWrapper.appendChild(textWrapperResults);
                const titleResults = document.createElement('p');
                titleResults.setAttribute('aria-label', 'title');
                titleResults.innerText = 'It’s all here. All in one place.';
                titleResults.className = 'display-title';
                textWrapperResults.appendChild(titleResults)
                const textResults = document.createElement('p');
                textResults.innerText = 'Enter your home address to find out your city councilmember and neighborhood district manager, along with local information about trash/recycling, your neighborhood police officer, city issues reported in your neighborhood, and more.';
                textWrapperResults.appendChild(textResults)
                shadow.appendChild(displayWrapper);
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
