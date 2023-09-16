import cl from './Input.module.scss';
import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, ...props }) => {
  return <input {...props} className={classNames(cl.input, className)} />;
};

export default Input;
