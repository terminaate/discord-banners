import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type UseInputStateReturn = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>,
];

export function useInputState(
  initialState = '',
  onChange?: UseInputStateReturn[1],
): UseInputStateReturn {
  const [state, setState] = useState<string>(initialState);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setState(e.target.value);
  };

  return [state, onInputChange, setState];
}
