import { html } from 'lit-html';
import './codbutton';

export default {
  title: 'COD/Button',
};

export const PrimaryColor1 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-1');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const PrimaryColor2 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-2');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const PrimaryColor3 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-3');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const PrimaryColor4 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-4');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const PrimaryColor5 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-5');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const Secondary = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-1');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const Small = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'small');
  btn.setAttribute('data-background-color', 'color-1');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const Large = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'large');
  btn.setAttribute('data-background-color', 'color-1');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const Image = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Image');
  btn.setAttribute('data-size', 'large');
  btn.setAttribute('data-background-color', 'color-5');
  btn.setAttribute('data-img', 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-02/map.png');
  btn.setAttribute('data-img-alt', 'map');
  return btn;
}
