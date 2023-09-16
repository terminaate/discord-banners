import { RefObject, useCallback, useRef } from 'react';
import useWindowEvent from '@/hooks/useWindowEvent';

export default <T extends HTMLElement>(
  then: () => void,
  event: 'mousedown' | 'mouseup' | 'click' = 'mousedown',
  except?: RefObject<HTMLElement>,
) => {
  const ref = useRef<null | T>(null);

  const handler = useCallback((e: MouseEvent) => {
    const { target } = e as MouseEvent & { target: HTMLElement };
    if (null === ref.current) {
      return;
    }

    if (!ref.current?.contains(target) && !except?.current?.contains(target)) {
      then();
    }
  }, []);

  useWindowEvent(event, handler);

  return ref;
};
