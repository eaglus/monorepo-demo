import { AnyAction } from 'typescript-fsa';

import { reducerSegment as authReducerSegment } from '@tsp-wl/auth';

import {
  ProfileState,
  actions,
  initialState,
  ReducerSegment,
  storePart,
  ProfileStatus
} from './types';

export function reducer(state: ProfileState | undefined, action: AnyAction): ProfileState {
  if (!state) {
    return initialState;
  }

  if (actions.set.match(action)) {
    return action.payload;
  } else if (actions.load.started.match(action)) {
    return {
      _type: ProfileStatus.InProgress
    };
  } else if (actions.load.done.match(action)) {
    return {
      _type: ProfileStatus.Loaded,
      ...action.payload.result
    };
  } else if (actions.load.failed.match(action)) {
    return {
      _type: ProfileStatus.Error,
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
