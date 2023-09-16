import { ButtonHTMLAttributes, FC } from 'react';
import cl from './Button.module.scss';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  background?: boolean;
};

const Button: FC<Props> = ({
  children,
  background = true,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      data-background={background}
      className={classNames(cl.button, className)}
    >
      {children}
    </button>
  );
};

export default Button;
