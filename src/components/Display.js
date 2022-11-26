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
            #display-wrapper { display: flex; padding: 1em; flex-wrap: wrap;}
            #display-wrapper > img { max-width: 100%; }
            #display-wrapper p { text-align: center; }
            #display-wrapper button { padding: 1em 2em;  background-color: #004445; color: #fff; border: none; cursor: pointer }
            p.display-title { font-weight: bold; font-size: 1.25em; }
            #data-results{ width: 100%}
        `;

        this.loadingStyle = document.createElement('style');
        this.loadingStyle.textContent = `
        .loader-box{
            display: flex;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, .75);
            position: absolute;
            left: -0.2em;
            top: -0.2em;
        }
        .loader-container{
            margin: auto;
        }
        .loader {
            position: relative;
            width: 75px;
            height: 100px;
       }
        .loader__bar {
            position: absolute;
            bottom: 0;
            width: 10px;
            height: 50%;
            background: #ea4961;
            transform-origin: center bottom;
            box-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
       }
        .loader__bar:nth-child(1) {
            left: 0px;
            transform: scale(1, 0.2);
            animation: barUp1 4s infinite;
       }
        .loader__bar:nth-child(2) {
            left: 20px;
            transform: scale(1, 0.4);
            animation: barUp2 4s infinite;
       }
        .loader__bar:nth-child(3) {
            left: 40px;
            transform: scale(1, 0.6);
            animation: barUp3 4s infinite;
       }
        .loader__bar:nth-child(4) {
            left: 60px;
            transform: scale(1, 0.8);
            animation: barUp4 4s infinite;
       }
        .loader__bar:nth-child(5) {
            left: 80px;
            transform: scale(1, 1);
            animation: barUp5 4s infinite;
       }
        .loader__ball {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 10px;
            height: 10px;
            background: #ea4961;
            border-radius: 50%;
            animation: ball 4s infinite;
       }
        @keyframes ball {
            0% {
                transform: translate(0, 0);
           }
            5% {
                transform: translate(10px, -14px);
           }
            10% {
                transform: translate(20px, -10px);
           }
            17% {
                transform: translate(30px, -24px);
           }
            20% {
                transform: translate(40px, -20px);
           }
            27% {
                transform: translate(50px, -34px);
           }
            30% {
                transform: translate(60px, -30px);
           }
            37% {
                transform: translate(70px, -44px);
           }
            40% {
                transform: translate(80px, -40px);
           }
            50% {
                transform: translate(80px, 0);
           }
            57% {
                transform: translate(70px, -14px);
           }
            60% {
                transform: translate(60px, -10px);
           }
            67% {
                transform: translate(50px, -24px);
           }
            70% {
                transform: translate(40px, -20px);
           }
            77% {
                transform: translate(30px, -34px);
           }
            80% {
                transform: translate(20px, -30px);
           }
            87% {
                transform: translate(10px, -44px);
           }
            90% {
                transform: translate(0, -40px);
           }
            100% {
                transform: translate(0, 0);
           }
       }
        @keyframes barUp1 {
            0% {
                transform: scale(1, 0.2);
           }
            40% {
                transform: scale(1, 0.2);
           }
            50% {
                transform: scale(1, 1);
           }
            90% {
                transform: scale(1, 1);
           }
            100% {
                transform: scale(1, 0.2);
           }
       }
        @keyframes barUp2 {
            0% {
                transform: scale(1, 0.4);
           }
            40% {
                transform: scale(1, 0.4);
           }
            50% {
                transform: scale(1, 0.8);
           }
            90% {
                transform: scale(1, 0.8);
           }
            100% {
                transform: scale(1, 0.4);
           }
       }
        @keyframes barUp3 {
            0% {
                transform: scale(1, 0.6);
           }
            100% {
                transform: scale(1, 0.6);
           }
       }
        @keyframes barUp4 {
            0% {
                transform: scale(1, 0.8);
           }
            40% {
                transform: scale(1, 0.8);
           }
            50% {
                transform: scale(1, 0.4);
           }
            90% {
                transform: scale(1, 0.4);
           }
            100% {
                transform: scale(1, 0.8);
           }
       }
        @keyframes barUp5 {
            0% {
                transform: scale(1, 1);
           }
            40% {
                transform: scale(1, 1);
           }
            50% {
                transform: scale(1, 0.2);
           }
            90% {
                transform: scale(1, 0.2);
           }
            100% {
                transform: scale(1, 1);
           }
       }       
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
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(this.neighborhoodImage);
                const textWrapperActive = document.createElement('article');
                displayWrapper.appendChild(textWrapperActive);
                const titleActive = document.createElement('p');
                titleActive.setAttribute('aria-label', 'title');
                titleActive.innerText = 'It’s all here. All in one place.';
                titleActive.className = 'display-title';
                textWrapperActive.appendChild(titleActive)
                const textActive = document.createElement('p');
                textActive.innerText = 'Enter your home address to find out your city councilmember and neighborhood district manager, along with local information about trash/recycling, your neighborhood police officer, city issues reported in your neighborhood, and more.';
                textWrapperActive.appendChild(textActive)
                shadow.appendChild(displayWrapper);
                break;

            case 'loading':
                console.log(display);
                console.log(display.loadingStyle);
                displayWrapper.appendChild(display.welcomeStyle);
                displayWrapper.appendChild(display.loadingStyle);
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
                shadow.appendChild(displayWrapper);
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
                const results = document.createElement('section');
                results.id = 'data-results';
                const app = document.getElementsByTagName('my-home-info');
                const data = JSON.parse(app[0].getAttribute('data-parcel-id'));
                console.log(data);
                results.innerHTML = `<p><strong>${data.address}</strong></p>`;
                displayWrapper.appendChild(results);
                shadow.appendChild(displayWrapper);
                break;
        
            default:
                break;
        }
    }

}
