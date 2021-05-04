import { Observable, concat } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActionCreator, AnyAction } from 'typescript-fsa';

import * as R from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function';
import { readerObservable as RO } from 'fp-ts-rxjs';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { ofActionPayload } from '@tsp-wl/utils/redux-utils';
import { ProfileData, profileActions } from '@tsp-wl/profile';
import { authActions, AuthParams, AuthData } from '@tsp-wl/auth';

import {
  mapObservable,
  catchErrorO,
  switchMapR,
  mapR,
  chainWith
} from './operatorsR';
import { combineLatestR, concatR, combineWith } from './combineOperatorsR';

//======== logger.ts ========
interface Logger {
  log: (category: string, ...params: unknown[]) => void;
}

interface LoggerDep {
  logger: Logger;
}

const askLogger = () =>
  pipe(
    RO.ask<LoggerDep>(),
    RO.map(deps => deps.logger)
  );

//========= api-transort.ts =====
interface ApiTransport {
  call: <Result>(
    method: string,
    ...params: unknown[]
  ) => ReaderObservable<LoggerDep, Result>;
}

interface ApiTransportDep {
  transport: ApiTransport;
}

const askTransport = () =>
  pipe(
    RO.ask<ApiTransportDep>(),
    RO.map(deps => deps.transport)
  );

//============ auth-data.ts ===============

interface AuthDataDep {
  getAuthData: () => AuthData;
}

const askAuthData = () =>
  pipe(
    RO.ask<AuthDataDep>(),
    RO.map(deps => deps.getAuthData)
  );

//============ api.ts ===============

interface ApiService {
  signIn(
    params: AuthParams
  ): ReaderObservable<ApiTransportDep & LoggerDep, AuthData>;

  signOut(): ReaderObservable<ApiTransportDep & LoggerDep & AuthDataDep, void>;

  fetchProfile(): ReaderObservable<
    ApiTransportDep & LoggerDep & AuthDataDep,
    ProfileData
  >;
}

interface ApiServiceDep {
  apiService: ApiService;
}

const askApiService = () =>
  pipe(
    RO.ask<ApiServiceDep>(),
    RO.map(deps => deps.apiService)
  );

//========= actions-dep.ts =====

interface ActionsDep {
  actions$: Observable<AnyAction>;
}

const askActions = () =>
  pipe(
    R.ask<ActionsDep>(),
    R.map(deps => deps.actions$)
  );

const ofActionPayloadR = <Payload>(actionCreator: ActionCreator<Payload>) =>
  pipe(askActions(), mapObservable(ofActionPayload(actionCreator)));

//============ epic.ts ===============

const epicTest = pipe(
  combineLatestR([
    askApiService(),
    ofActionPayloadR(authActions.signIn.started)
  ]),
  chainWith(switchMap, ([api, params]) => api.signIn(params))
);

const epicAuth = pipe(
  combineLatestR([
    askApiService(),
    ofActionPayloadR(authActions.signIn.started)
  ]),
  switchMapR(([api, params]) =>
    pipe(
      //concatR([
      combineWith(concat, [
        RO.of(authActions.signIn.started(params)),
        RO.of(profileActions.load.started()),
        pipe(
          api.signIn(params),
          mapR(authData =>
            authActions.signIn.done({
              params,
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
      catchErrorO(error => [
        authActions.signIn.failed({
          params,
          error
        }),
        profileActions.load.failed({
          error
        })
      ])
    )
  )
);

////////////

const createConsoleLoggerDep = (): LoggerDep => ({
  logger: {
    log: console.log
  }
});

const createFakeTransport = (): ApiTransport => ({
  call: (method, params) =>
    pipe(
      askLogger(),
      switchMapR(logger => {
        logger.log('fake transport', method, params);
        return RO.zero;
      })
    )
});

const createApiService = (): ApiService => ({
  signIn: params =>
    pipe(
      combineLatestR([askLogger(), askTransport()]),
      switchMapR(([logger, transport]) => {
        logger.log('api service', 'signing in', params.login);
        return transport.call<AuthData>('signIn', params);
      })
    ),

  signOut: () =>
    pipe(
      combineLatestR([askLogger(), askTransport(), askAuthData()]),
      switchMapR(([logger, transport, getAuthData]) => {
        const authData = getAuthData();
        logger.log('api service', 'signing out', authData.userId);
        return transport.call<void>('signOut', authData);
      })
    ),

  fetchProfile: () =>
    pipe(
      combineLatestR([askLogger(), askTransport(), askAuthData()]),
      switchMapR(([logger, transport, getAuthData]) => {
        const authData = getAuthData();
        logger.log('api service', 'fetch profile', authData.userId);
        return transport.call<ProfileData>('getProfile', authData);
      })
    )
});
