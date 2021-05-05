import { camelCase } from 'lodash-es';

import { timeoutPromise, assert } from '@tsp-wl/utils';
import { selectAuth, AuthStatus } from '@tsp-wl/auth';

import { actions, ProfileStatus, storePart, ThunkAction } from './types';
import { selectProfile } from './selectors';

export const load = (): ThunkAction<void> => async (dispatch, getState) => {
  const auth = selectAuth(getState());
  const profile = selectProfile(getState());

  assert(auth._type === AuthStatus.Authorized);
  const userId = auth.userId;

  if (
    profile._type === ProfileStatus.Loaded ||
    profile._type === ProfileStatus.InProgress
  ) {
    console.log(`[${storePart}:load] return because loaded or loading`);
    return;
  }

  console.log(`[${storePart}:load] load profile by userId: ${userId}`);
  dispatch(
    actions.set({
      _type: ProfileStatus.InProgress
    })
  );
  await timeoutPromise(1000);

  dispatch(
    actions.set({
      _type: ProfileStatus.Loaded,
      userId,
      email: userId + '@email.com',
      name: camelCase(userId) + ' Pupkin'
    })
  );
};
