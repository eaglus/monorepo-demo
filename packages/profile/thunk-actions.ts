import { camelCase } from 'lodash';

import { timeoutPromise } from '@tsp-wl/utils';

import { actions, ProfileState, ThunkAction } from './types';
import { selectAuth } from './selectors';

export const load = (userId: string): ThunkAction<void> => async (
  dispatch,
  getState
) => {
  const auth = selectAuth(getState());
  if (
    auth._type === ProfileState.Loaded ||
    auth._type === ProfileState.InProgress
  ) {
    throw new Error('Assertion failed: incorrect current profile state');
  }

  console.log('load profile by userId: ', userId);
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

export const unload = (): ThunkAction<void> => async (dispatch, getState) => {
  const auth = selectAuth(getState());
  if (auth._type !== ProfileState.Loaded) {
    return;
  }

  console.log('unload profile by userId: ', auth.userId);
  dispatch(
    actions.set({
      _type: ProfileState.Empty
    })
  );
};
