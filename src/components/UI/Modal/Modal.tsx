import { Dispatch, FC, MouseEvent, SetStateAction, useCallback } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import cl from './Modal.module.scss';
import classNames from 'classnames';
import useKeyPress from '@/hooks/useKeyPress';

export type Props = HTMLMotionProps<'div'> & {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>> | ((newValue: boolean) => void);
};

const Modal: FC<Props> = ({
  children,
  visible,
  setVisible,
  className,
  onClick,
  ...props
}) => {
  const closeModal = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const preventClosingModal = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  }, []);

  useKeyPress('Escape', closeModal, 'keydown');

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={cl.modalScreen}
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.5, ease: [0.71, -0.18, 0.59, 1.43] }}
            className={classNames(cl.modalContent, className)}
            onClick={preventClosingModal}
            {...props}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector('#modals')!,
  );
};

export default Modal;
