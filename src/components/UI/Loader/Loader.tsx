import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import React, { FC } from 'react';
import cl from './Loader.module.scss';
import loaderImage from '#/images/loading.gif';
import classNames from 'classnames';

type Props = HTMLMotionProps<'div'> & {
  visible: boolean;
  title?: string;
  body?: string;
};

export const Loader: FC<Props> = ({
  className,
  visible,
  title,
  body,
  ...props
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={classNames(cl.loaderScreen, className)}
        >
          <img src={loaderImage} alt={loaderImage} />
          <h2 className={cl.text}>{title}</h2>
          <h3 className={cl.textSecondary}>{body}</h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
