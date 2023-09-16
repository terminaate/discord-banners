import { AnchorHTMLAttributes, FC, MouseEvent, useCallback } from 'react';
import useNavigate from '@/hooks/useNavigate';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const Link: FC<Props> = ({ href, children, onClick = () => {}, ...props }) => {
  const navigate = useNavigate();

  const onLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href);
    onClick(e);
  }, []);

  return (
    <a onClick={onLinkClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
