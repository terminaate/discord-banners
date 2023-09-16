import { useLayoutEffect, useState } from 'react';

export default (query: string) => {
  const media = matchMedia(query);

  const [isMedia, setIsMedia] = useState<boolean>(media.matches);

  useLayoutEffect(() => {
    const handler = () => {
      setIsMedia(media.matches);
    };

    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  });

  return isMedia;
};
