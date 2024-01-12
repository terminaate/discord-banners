import loaderImg from '@/assets/images/loading.gif';

export function initLoader() {
  const loader = document.getElementById('loader') as HTMLDivElement;
  const loaderImage = document.getElementById(
    'loaderImage',
  ) as HTMLImageElement;

  if (loaderImage) {
    loaderImage.src = loaderImg;
  }

  document.body.onload = async () => {
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
