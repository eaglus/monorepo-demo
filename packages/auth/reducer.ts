import { AnyAction } from 'typescript-fsa';

import {
  AuthState,
  actions,
  initialState,
  ReducerSegment,
  AuthStatus,
  storePart
} from './types';

export function reducer(state: AuthState | undefined, action: AnyAction): AuthState {
  if (!state) {
    return initialState;
  }

  if (actions.set.match(action)) {
    return action.payload;
  } else if (actions.signIn.started.match(action)) {
    return {
      _type: AuthStatus.InProgress
    };
  } else if (actions.signIn.done.match(action)) {
    return {
      _type: AuthStatus.Authorized,
      ...action.payload.result
    };
  } else if (actions.signIn.failed.match(action)) {
    return {
      _type: AuthStatus.Error,
      ...action.payload.error
    };
  } else if (actions.signOut.started.match(action)) {
    return {
      _type: AuthStatus.InProgress
    };
  } else if (actions.signOut.done.match(action)) {
    return {
      _type: AuthStatus.Unauthorized
    };
  } else if (actions.signOut.failed.match(action)) {
    return {
      _type: AuthStatus.Error,
      ...action.payload.error
    };
  } else {
    return state;
  }
}

export const reducerSegment: ReducerSegment = {
  [storePart]: reducer
};
