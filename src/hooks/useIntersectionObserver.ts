import { useEffect, useRef } from 'react';

export default (cb: () => void, options: IntersectionObserverInit = {}) => {
  const elementRef = useRef(null);

  const observerRef = useRef(
    new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb();
          observer.unobserve(entry.target);
        }
      });
    }, options),
  );

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }
  }, []);

  return elementRef;
};
