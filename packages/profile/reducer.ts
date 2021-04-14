import { AnyAction } from 'typescript-fsa';

import { reducerSegment as authReducerSegment } from '@tsp-wl/auth';

import {
  State,
  actions,
  initialState,
  ReducerSegment,
  storePart,
  ProfileState
} from './types';

export function reducer(state: State | undefined, action: AnyAction): State {
  if (!state) {
    return initialState;
  }

  if (actions.set.match(action)) {
    return action.payload;
  } else if (actions.load.started.match(action)) {
    return {
      _type: ProfileState.InProgress
    };
  } else if (actions.load.done.match(action)) {
    return {
      _type: ProfileState.Loaded,
      ...action.payload.result
    };
  } else if (actions.load.failed.match(action)) {
    return {
      _type: ProfileState.Error,
      ...action.payload.error
    };
  } else {
    return state;
  }
}

export const reducerSegment: ReducerSegment = {
  ...authReducerSegment,
  [storePart]: reducer
};
