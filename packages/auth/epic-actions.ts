import { from } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { ApiDeps } from '@tsp-wl/api';
import { Epic, ofActionPayload, combineEpics } from '@tsp-wl/utils';

import { AuthStoreSegment, actions, AuthData } from './types';

const signInEpic: Epic<AuthStoreSegment, ApiDeps> = (actions$, _state$, deps) =>
  actions$.pipe(
    ofActionPayload(actions.signIn.started),
    switchMap(params =>
      from(
        deps.api.call<AuthData>('sign-in', [params])
      ).pipe(
        map(result =>
          actions.signIn.done({
            params,
            result
          })
        ),
        catchError(error => [
          actions.signIn.failed({
            params,
            error
          })
        ])
      )
    )
  );

const signOutEpic: Epic<AuthStoreSegment, ApiDeps> = (actions$, _state$, deps) =>
  actions$.pipe(
    ofActionPayload(actions.signOut.started),
    switchMap(() =>
      from(deps.api.call('sign-out', [])).pipe(
        map(() => actions.signOut.done({})),
        catchError(error => [
          actions.signOut.failed({
            error
          })
        ])
      )
    )
  );

export const authEpic = combineEpics([signInEpic, signOutEpic]);

export const epics = [authEpic];
