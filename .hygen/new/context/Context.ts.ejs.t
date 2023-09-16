---
to: <%= path %>/<%= contextName %>.ts
---

import { Action } from './<%= contextName %>Reducer';
import React, { createContext } from 'react';

export interface I<%= contextName %> {
  state: any;
  dispatch: (action: Action) => void | React.Dispatch<Action>;
}

export const initialState: I<%= contextName %> = {
  state: {},
  dispatch: () => {},
};

const <%= contextName %> = createContext<I<%= contextName %>>(initialState);

export default <%= contextName %>;
