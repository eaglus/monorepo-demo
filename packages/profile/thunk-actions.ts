import { camelCase } from 'lodash';

import { timeoutPromise, assert } from '@tsp-wl/utils';
import { selectAuth, AuthorizationState } from '@tsp-wl/auth';

import { actions, ProfileState, storePart, ThunkAction } from './types';
import { selectProfile } from './selectors';

export const load = (): ThunkAction<void> => async (dispatch, getState) => {
  const auth = selectAuth(getState());
  const profile = selectProfile(getState());

  assert(auth._type === AuthorizationState.Authorized);
  const userId = auth.userId;

  if (
    profile._type === ProfileState.Loaded ||
    profile._type === ProfileState.InProgress
  ) {
    console.log(`[${storePart}:load] return because loaded or loading`);
    return;
  }

  console.log(`[${storePart}:load] load profile by userId: ${userId}`);
  dispatch(
    actions.set({
      _type: ProfileState.InProgress
    })
  );
  await timeoutPromise(1000);

  dispatch(
    actions.set({
      _type: ProfileState.Loaded,
      userId,
      email: userId + '@email.com',
      name: camelCase(userId) + ' Pupkin'
    })
  );
};
