import { AnyAction } from 'typescript-fsa';
import { Middleware } from 'redux';

import { matchI } from '@tsp-wl/utils';

import { actions, AuthorizationState, StoreSegment, storePart } from './types';

const authMiddleware: Middleware<unknown, StoreSegment> = () => {
  return next => (action: AnyAction) => {
    if (actions.set.match(action)) {
      const message = matchI(action.payload)({
        [AuthorizationState.InProgress]: () => 'Login/logout progress...',
        [AuthorizationState.Unauthorized]: () => 'Logged out',
        [AuthorizationState.Authorized]: auth => 'Logged in as ' + auth.userId,
        [AuthorizationState.Error]: err => 'Error logging in ' + err.message
      });
      console.log(`[${storePart}:middleware] ${message}`);
    }
    return next(action);
  };
};

export const middlewares = [authMiddleware];
