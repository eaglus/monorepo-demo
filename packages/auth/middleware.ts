import { AnyAction } from 'typescript-fsa';
import { Middleware } from 'redux';

import { matchI } from '@tsp-wl/utils';

import { actions, AuthStatus, AuthStoreSegment, storePart } from './types';

const authMiddleware: Middleware<unknown, AuthStoreSegment> = () => {
  return next => (action: AnyAction) => {
    if (actions.set.match(action)) {
      const message = matchI(action.payload)({
        [AuthStatus.InProgress]: () => 'Login/logout progress...',
        [AuthStatus.Unauthorized]: () => 'Logged out',
        [AuthStatus.Authorized]: auth => 'Logged in as ' + auth.userId,
        [AuthStatus.Error]: err => 'Error logging in ' + err.message
      });
      console.log(`[${storePart}:middleware] ${message}`);
    }
    return next(action);
  };
};

export const middlewares = [authMiddleware];
