import cl from './Checkbox.module.scss';
import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<Props> = (props) => {
  const { checked, className } = props;

  const onCheckboxClick = () => {
    const changeEvent = {
      target: {
        checked: !checked,
      },
    };

    props.onChange?.(changeEvent as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      {...props}
      data-active={!!checked}
      onClick={onCheckboxClick}
      className={classNames(cl.checkboxContainer, className)}
    />
  );
};
