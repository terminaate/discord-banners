---
to: <%= path %>/<%= componentName %>.tsx
---
import cl from './<%= componentName %>.module.scss';
import type {FC} from 'react';

type Props = {

}

const <%= componentName %>: FC<Props> = () => {
  return (
    <>

    </>
  );
};

export default <%= componentName %>;