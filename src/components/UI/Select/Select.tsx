import { FC, HTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import cl from './Select.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { FaChevronDown } from 'react-icons/fa';

export type SelectVariant = { name: string; key: string; image?: string };

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: SelectVariant;
  onChange?(newVariant: SelectVariant): void;
  variants: SelectVariant[];
};

export const Select: FC<Props> = ({
  value,
  onChange,
  variants,
  className,
  ...props
}) => {
  const [variantsVisible, setVariantsVisible] = useState<boolean>(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setVariantsVisible(false);
  });

  const filteredVariants = value
    ? variants.filter((v) => v.key !== value?.key)
    : variants;

  return (
    <div
      {...props}
      ref={containerRef}
      className={classNames(cl.selectContainer, className)}
    >
      <div
        onClick={() => setVariantsVisible(!variantsVisible)}
        className={cl.selectedVariant}
        data-active={variantsVisible}
      >
        <span>{value?.name ?? 'None'}</span>
        <FaChevronDown size={24} className={cl.arrowIcon} />
      </div>

      {variantsVisible && (
        <div
          onClick={() => setVariantsVisible(false)}
          className={cl.selectVariantsContainer}
        >
          {filteredVariants.map((variant, key) => (
            <div
              className={cl.candidateVariant}
              onClick={() => onChange?.(variant)}
              key={key}
            >
              <span>{variant.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
