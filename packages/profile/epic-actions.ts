import { combineLatest } from 'rxjs';
import {
  catchError,
  switchMap,
  first,
  map,
  distinctUntilKeyChanged,
  filter,
  skip
} from 'rxjs/operators';

import { LoggerDeps } from '@tsp-wl/logger';
import { ApiDeps } from '@tsp-wl/api';
import { assert } from '@tsp-wl/utils';
import { Epic, ofActionPayload, combineEpics } from '@tsp-wl/utils';
import {
  epics as authEpics,
  selectAuth,
  AuthorizationState
} from '@tsp-wl/auth';

import {
  StoreSegment,
  actions,
  ProfileData,
  storePart,
  initialState
} from './types';

const loadEpic: Epic<StoreSegment, LoggerDeps & ApiDeps> = (
  actions$,
  state$,
  deps
) => {
  const authReady$ = state$.pipe(
    map(selectAuth),
    first(auth => auth._type === AuthorizationState.Authorized)
  );

  return actions$.pipe(
    ofActionPayload(actions.load.started),
    switchMap(() =>
      combineLatest([authReady$]).pipe(
        switchMap(([auth]) => {
          assert(auth._type === AuthorizationState.Authorized);
          const userId = auth.userId;
          deps.logger.log(
            `[${storePart}:load]`,
            `load profile by userId: ${userId}`
          );
          return deps.api.call<ProfileData>('profile', [userId]);
        })
      )
    ),
    map(profileData =>
      actions.load.done({
        result: profileData
      })
    ),
    catchError(error => [
      actions.load.failed({
        error
      })
    ])
  );
};

const resetEpic: Epic<StoreSegment, LoggerDeps & ApiDeps> = (
  _actions$,
  state$
) =>
  state$.pipe(
    map(selectAuth),
    distinctUntilKeyChanged('_type'),
    filter(auth => auth._type === AuthorizationState.Unauthorized),
    skip(1),
    map(() => actions.set(initialState))
  );

export const profileEpic = combineEpics([loadEpic, resetEpic]);

export const epics = [...authEpics, profileEpic];
