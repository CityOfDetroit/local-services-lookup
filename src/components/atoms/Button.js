export default class Button extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const btnStyles = document.createElement('style');
    btnStyles.textContent = `
    .cod-button {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 700;
      border: 0;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
    }
    .cod-button--primary.cod-button--color-1 {
      color: #fff;
      background-color: #004445;
    }
    .cod-button--primary.cod-button--color-2 {
      color: #004445;
      background-color: #9FD5B3;
    }
    .cod-button--primary.cod-button--color-3 {
      color: #000;
      background-color: #feb70d;
    }
    .cod-button--primary.cod-button--color-4 {
      color: #fff;
      background-color: #b3393b;
    }

    .cod-button--primary.cod-button--color-5 {
      color: #000;
      background-color: #e6e6e6;
    }
    .cod-button--secondary {
      color: #004445;
      background-color: transparent;
      box-shadow: rgba(0, 68, 69, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--small {
      font-size: 12px;
      padding: 10px 16px;
    }
    .cod-button--medium {
      font-size: 14px;
      padding: 11px 20px;
    }
    .cod-button--large {
      font-size: 16px;
      padding: 12px 24px;
    }

    .cod-button--img {
      display: flex;
    }
    
    .cod-button--img img {
      height: 1em;
      margin-left: .5em;
    }
    `;
     // Button attributes
     let primary = this.getAttribute('data-primary');
     let mode = (primary == 'true') ? 'cod-button--primary' : 'cod-button--secondary';
     let backgroundColor = this.getAttribute('data-background-color');
     let imgSrc = this.getAttribute('data-img');
     let imgAlt = this.getAttribute('data-img-alt');
     let img = (imgAlt != '') ? 'img' : 'not-img';
     let size = this.getAttribute('data-size');
     let label = this.getAttribute('data-label');
    this.shadowRoot.appendChild(btnStyles);
    const btnClick = this.btnClick;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = ['cod-button', `cod-button--${size || 'medium'}`, `cod-button--${img}`, `cod-button--${backgroundColor}`, mode].join(' ');
    btn.innerText = label;
    if(imgAlt != ''){
      const btnIcon = document.createElement('img');
      btnIcon.src = imgSrc;
      btnIcon.setAttribute('alt', imgAlt);
      btn.appendChild(btnIcon);
    }
    this.shadowRoot.appendChild(btn);
  }
};