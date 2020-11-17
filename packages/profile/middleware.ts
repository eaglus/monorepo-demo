import { AnyAction } from 'typescript-fsa';
import { Middleware } from 'redux';

import {
  selectAuth,
  AuthorizationState,
  middlewares as authMiddlewares
} from '@tsp-wl/auth';

import { StoreSegment, actions, ProfileState, storePart } from './types';

const profileMiddleware: Middleware<unknown, StoreSegment> = api => {
  return next => (action: AnyAction) => {
    const auth = selectAuth(api.getState());
    const result = next(action);
    const newAuth = selectAuth(api.getState());
    if (auth._type === AuthorizationState.Authorized && auth !== newAuth) {
      console.log(`[${storePart}:middleware] clear profile (logout)`);
      return next(
        actions.set({
          _type: ProfileState.Empty
        })
      );
    }
    return result;
  };
};

export const middlewares = [authMiddlewares, profileMiddleware];
