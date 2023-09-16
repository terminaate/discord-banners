---
to: <%= path %>/<%= contextName %>Reducer.ts
---

import { I<%= contextName %> } from './<%= contextName %>';

export type Action<T = any> = {
  type: string;
  payload?: T;
};

export const <%= contextName %>Reducer = (
  state: I<%= contextName %>['state'],
  action: Action,
): typeof state => {
  switch (action.type) {

  }
  throw new Error('Unkown action type.');
};
