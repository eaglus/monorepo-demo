import { timeoutPromise } from '@tsp-wl/utils';

import { actions, AuthorizationState, storePart, ThunkAction } from './types';
import { selectAuth } from './selectors';

export const signIn = (
  login: string,
  password: string
): ThunkAction<void> => async (dispatch, getState) => {
  const auth = selectAuth(getState());
  if (
    auth._type === AuthorizationState.Authorized ||
    auth._type === AuthorizationState.InProgress
  ) {
    throw new Error('Assertion failed: incorrect current auth state');
  }

  console.log(
    `[${storePart}:signIn]`,
    'login: ',
    login,
    'password (length): ',
    password.length
  );
  dispatch(
    actions.set({
      _type: AuthorizationState.InProgress
    })
  );
  await timeoutPromise(1000);

  dispatch(
    actions.set({
      _type: AuthorizationState.Authorized,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      userId: login
    })
  );
};

export const signOut = (): ThunkAction<void> => async (dispatch, getState) => {
  const auth = selectAuth(getState());
  if (
    auth._type === AuthorizationState.Unauthorized ||
    auth._type === AuthorizationState.Error ||
    auth._type === AuthorizationState.InProgress
  ) {
    throw new Error('Assertion failed: incorrect current auth state');
  }

  console.log(`[${storePart}:signIn] logout`);

  dispatch(
    actions.set({
      _type: AuthorizationState.InProgress
    })
  );
  await timeoutPromise(1000);

  dispatch(
    actions.set({
      _type: AuthorizationState.Unauthorized
    })
  );
};
