import { ContextState } from '@/types/ContextState';

export const createContextDefaultState = <T = any>(
  state: T,
): ContextState<T> => ({
  state,
  dispatch: function (action) {
    return this.state;
  },
});
