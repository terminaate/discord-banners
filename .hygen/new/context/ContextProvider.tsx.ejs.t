---
to: <%= path %>/<%= contextName %>Provider.tsx
---

import React, { FC, PropsWithChildren, useReducer } from 'react';
import <%= contextName %>, { initialState } from './<%= contextName %>';
import { <%= contextName %>Reducer } from './<%= contextName %>Reducer';

export const <%= contextName %>Provider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(<%= contextName %>Reducer, initialState.state);

  return (
    <<%= contextName %>.Provider value={{state, dispatch}}>
      {children}
    </<%= contextName %>.Provider>
  );
};