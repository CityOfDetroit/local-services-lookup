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
    .cod-button.cod-button--square.cod-button--img{
      display: flex;
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
    .cod-button--secondary.cod-button--color-1 {
      color: #004445;
      background-color: transparent;
      box-shadow: rgba(0, 68, 69, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--secondary.cod-button--color-2 {
      color: #004445;
      background-color: transparent;
      box-shadow: rgba(159, 213, 179, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--secondary.cod-button--color-3 {
      color: #000;
      background-color: transparent;
      box-shadow: rgba(254, 183, 13, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--secondary.cod-button--color-4 {
      color: #b3393b;
      background-color: transparent;
      box-shadow: rgba(179, 57, 59, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--secondary.cod-button--color-5 {
      color: #000;
      background-color: transparent;
      box-shadow: rgba(230, 230, 230, 1) 0px 0px 0px 1px inset;
    }
    .cod-button--small.cod-button--fluid {
      font-size: 1em;
      padding: .8em 1.1em;
    }
    .cod-button--medium.cod-button--fluid {
      font-size: 1.1em;
      padding: .75em 1.25em;
    }
    .cod-button--large.cod-button--fluid {
      font-size: 1.2em;
      padding: 1em 2em;
    }

    .cod-button--small.cod-button--square {
      font-size: 1em;
      height: 2em;
      width: 2em;
    }
    .cod-button--medium.cod-button--square {
      font-size: 1.1em;
      height: 2.5em;
      width: 2.5em;
    }
    .cod-button--large.cod-button--square {
      font-size: 1.2em;
      height: 3em;
      width: 3em;
    }

    .cod-button--img {
      display: flex;
    }
    
    .cod-button--img img {
      height: 1em;
      margin-left: .5em;
    }

    .cod-button--square.cod-button--img img {
      height: auto;
      max-width: 100%;
      margin: auto;
    }
    `;
     // Button attributes
     let primary = this.getAttribute('data-primary');
     let mode = (primary == 'true') ? 'cod-button--primary' : 'cod-button--secondary';
     let backgroundColor = this.getAttribute('data-background-color');
     let shape = this.getAttribute('data-shape');
     let imgSrc = this.getAttribute('data-img');
     let imgAlt = this.getAttribute('data-img-alt');
     let img = (imgAlt != '') ? 'img' : 'not-img';
     let size = this.getAttribute('data-size');
     let label = this.getAttribute('data-label');
    this.shadowRoot.appendChild(btnStyles);
    const btnClick = this.btnClick;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = ['cod-button', `cod-button--${size || 'medium'}`, `cod-button--${img}`, `cod-button--${backgroundColor}`, `cod-button--${shape || 'fluid'}`, mode].join(' ');
    if(imgAlt != ''){
      btn.innerText = label;
      const btnIcon = document.createElement('img');
      btnIcon.src = imgSrc;
      btnIcon.setAttribute('alt', imgAlt);
      btn.appendChild(btnIcon);
    }else{
      btn.innerText = label;
    }
    this.shadowRoot.appendChild(btn);
  }
};