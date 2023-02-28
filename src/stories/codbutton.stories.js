import './codbutton';

export default {
  title: 'COD/Atoms/Button',
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

export const PrimaryColor1NoHover = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-hover', false);
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

export const PrimaryColorLight = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-light');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}
PrimaryColorLight.parameters = {
  backgrounds: { default: 'dark' },
};

export const PrimaryColorDark = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'Primary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-dark');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const SecondaryColor1 = () => {
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

export const SecondaryColor2 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-2');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const SecondaryColor3 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-3');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const SecondaryColor4 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-4');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const SecondaryColor5 = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-5');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const SecondaryColorLight = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-light');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}
SecondaryColorLight.parameters = {
  backgrounds: { default: 'dark' },
};

export const SecondaryColorDark = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-dark');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  return btn;
}

export const ExtraSmall = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', false);
  btn.setAttribute('data-label', 'Secondary');
  btn.setAttribute('data-size', 'xsmall');
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

export const SquareSmall = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'x');
  btn.setAttribute('data-size', 'small');
  btn.setAttribute('data-background-color', 'color-3');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  btn.setAttribute('data-shape', 'square');
  return btn;
}

export const SquareMedium = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'x');
  btn.setAttribute('data-size', 'medium');
  btn.setAttribute('data-background-color', 'color-3');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  btn.setAttribute('data-shape', 'square');
  return btn;
}

export const SquareLarge = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', 'x');
  btn.setAttribute('data-size', 'large');
  btn.setAttribute('data-background-color', 'color-3');
  btn.setAttribute('data-img', '');
  btn.setAttribute('data-img-alt', '');
  btn.setAttribute('data-shape', 'square');
  return btn;
}

export const SquareImage = () => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e)=>{
console.log(e);
  })
  btn.setAttribute('data-primary', true);
  btn.setAttribute('data-label', '');
  btn.setAttribute('data-size', 'large');
  btn.setAttribute('data-background-color', 'color-5');
  btn.setAttribute('data-img', 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-02/map.png');
  btn.setAttribute('data-img-alt', 'map');
  btn.setAttribute('data-shape', 'square');
  return btn;
}
