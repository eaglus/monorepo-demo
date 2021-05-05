import { AnyAction } from 'typescript-fsa';
import { Middleware } from 'redux';

import {
  selectAuth,
  AuthStatus,
  middlewares as authMiddlewares
} from '@tsp-wl/auth';

import { ProfileFullStoreSegment, actions, ProfileStatus, storePart } from './types';

const profileMiddleware: Middleware<unknown, ProfileFullStoreSegment> = api => {
  return next => (action: AnyAction) => {
    const auth = selectAuth(api.getState());
    const result = next(action);
    const newAuth = selectAuth(api.getState());
    if (auth._type === AuthStatus.Authorized && auth !== newAuth) {
      console.log(`[${storePart}:middleware] clear profile (logout)`);
      return next(
        actions.set({
          _type: ProfileStatus.Empty
        })
      );
    }
    return result;
  };
};

export const middlewares = [authMiddlewares, profileMiddleware];
