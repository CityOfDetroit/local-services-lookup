import './codloader';

export default {
  title: 'COD/Atoms/Loader',
};

export const LoaderColor1 = () => {
  const loader = document.createElement('cod-loader');
  return loader;
}

export const LoaderColor2 = () => {
  const loader = document.createElement('cod-loader');
  loader.setAttribute('data-color','color-2');
  return loader;
}

export const LoaderColor3 = () => {
  const loader = document.createElement('cod-loader');
  loader.setAttribute('data-color','color-3');
  return loader;
}

export const LoaderColor4 = () => {
  const loader = document.createElement('cod-loader');
  loader.setAttribute('data-color','color-4');
  return loader;
}

export const LoaderColor5 = () => {
  const loader = document.createElement('cod-loader');
  loader.setAttribute('data-color','color-5');
  return loader;
}