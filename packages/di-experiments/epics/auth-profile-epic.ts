import { concat } from 'rxjs';
import { AnyAction } from 'typescript-fsa';

import { pipe } from 'fp-ts/function';

import { profileActions, selectProfile } from '@tsp-wl/profile';
import { authActions, selectAuthorizedData } from '@tsp-wl/auth';

import {
  catchErrorO,
  switchMapR,
  mapR,
  fromR
} from '../operators/pipeOperatorsR';
import { combineLatestR, combineWithSum } from '../operators/combineOperatorsR';
//import { concatR } from './operators/combineOperatorsR';
import { ofActionPayloadR } from '../deps/actionsDep';
import { askApiService } from '../deps/apiServiceDep';
import { askStateSelect } from '../deps/storeDep';

//============ epic.ts ===============

const askProfile = askStateSelect(selectProfile);

export const epicAuth = pipe(
  combineLatestR([
    askApiService(),
    ofActionPayloadR(authActions.signIn.started),
    askProfile
  ]),
  switchMapR(([api, signInParams]) =>
    pipe(
      //concatR([
      combineWithSum(concat, [
        fromR([
          authActions.signIn.started(signInParams),
          profileActions.load.started()
        ]),
        pipe(
          api.signIn(signInParams),
          mapR(authData =>
            authActions.signIn.done({
              params: signInParams,
              result: authData
            })
          )
        ),
        pipe(
          api.fetchProfile(),
          mapR(profileData =>
            profileActions.load.done({
              result: profileData
            })
          )
        )
      ]),
      catchErrorO(
        error =>
          [
            authActions.signIn.failed({
              params: signInParams,
              error
            }),
            profileActions.load.failed({
              error
            })
          ] as AnyAction[]
      )
    )
  )
);
