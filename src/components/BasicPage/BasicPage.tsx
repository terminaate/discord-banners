import { FC, HTMLAttributes } from 'react';
import cl from './BasicPage.module.scss';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLElement>;

const BasicPage: FC<Props> = ({ children, className, ...props }) => {
  return (
    <main {...props} className={classNames(cl.basicPage, className)}>
      {children}
    </main>
  );
};

export default BasicPage;
