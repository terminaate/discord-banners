import loaderImageSrc from '@/assets/images/loading.gif';

export function initLoader() {
  const loader = document.querySelector<HTMLDivElement>('.loader');
  const loaderImage = document.querySelector<HTMLImageElement>('.loaderImage');

  if (loaderImage !== null) {
    loaderImage.src = loaderImageSrc;
  }

  document.body.onload = () => {
    if (loader !== null) {
      setTimeout(() => {
        loader.className = 'loader hiddenOpacity';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 600);
      }, 1000);
    }
  };
}
