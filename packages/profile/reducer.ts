import { AnyAction } from 'typescript-fsa';

import { reducerSegment as authReducerSegment } from '@tsp-wl/auth';

import {
  State,
  actions,
  initialState,
  ReducerSegment,
  storePart
} from './types';

export function reducer(state: State | undefined, action: AnyAction) {
  if (!state) {
    return initialState;
  }

  if (actions.set.match(action)) {
    return action.payload;
  } else {
    return state;
  }
}

export const reducerSegment: ReducerSegment = {
  ...authReducerSegment,
  [storePart]: reducer
};
