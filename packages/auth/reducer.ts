import { AnyAction } from 'typescript-fsa';

import {
  State,
  actions,
  initialState,
  ReducerSegment,
  AuthorizationState,
  storePart
} from './types';

export function reducer(state: State | undefined, action: AnyAction): State {
  if (!state) {
    return initialState;
  }

  if (actions.set.match(action)) {
    return action.payload;
  } else if (actions.signIn.started.match(action)) {
    return {
      _type: AuthorizationState.InProgress
    };
  } else if (actions.signIn.done.match(action)) {
    return {
      _type: AuthorizationState.Authorized,
      ...action.payload.result
    };
  } else if (actions.signIn.failed.match(action)) {
    return {
      _type: AuthorizationState.Error,
      ...action.payload.error
    };
  } else if (actions.signOut.started.match(action)) {
    return {
      _type: AuthorizationState.InProgress
    };
  } else if (actions.signOut.done.match(action)) {
    return {
      _type: AuthorizationState.Unauthorized
    };
  } else if (actions.signOut.failed.match(action)) {
    return {
      _type: AuthorizationState.Error,
      ...action.payload.error
    };
  } else {
    return state;
  }
}

export const reducerSegment: ReducerSegment = {
  [storePart]: reducer
};
