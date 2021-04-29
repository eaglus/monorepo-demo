import { Observable } from 'rxjs';
import { ActionCreator, AnyAction } from 'typescript-fsa';

import * as R from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function';
import { readerObservable as RO } from 'fp-ts-rxjs';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { ofActionPayload } from '@tsp-wl/utils/redux-utils';
import { ProfileData, profileActions } from '@tsp-wl/profile';
import { authActions, AuthParams, AuthData } from '@tsp-wl/auth';

import { pipeR } from './pipeR';
import { applyRxOperator, mapErrorR, switchMapR, mapR } from './operatorsR';
import { sequenceReaderGen } from './sequenceReaderGen';
import { concatToLastR } from './concatToLastR';

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
  pipe(askActions(), applyRxOperator(ofActionPayload(actionCreator)));

//============ epic.ts ===============

const epicAuth = pipeR(
  ofActionPayloadR(authActions.signIn.started),
  switchMapR(params =>
    pipeR(
      concatToLastR(
        RO.of(authActions.signIn.started(params)),
        pipeR(
          askApiService(),
          switchMapR(api => api.signIn(params)),
          mapR(authData =>
            authActions.signIn.done({
              params,
              result: authData
            })
          )
        ),
        RO.of(profileActions.load.started()),
        pipeR(
          askApiService(),
          switchMapR(api => api.fetchProfile()),
          mapR(profileData =>
            profileActions.load.done({
              result: profileData
            })
          ),
          mapErrorR(error =>
            profileActions.load.failed({
              error
            })
          )
        )
      ),
      mapErrorR(error =>
        authActions.signIn.failed({
          params,
          error
        })
      )
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
    pipeR(
      askLogger(),
      switchMapR(logger => {
        logger.log('fake transport', method, params);
        return RO.zero;
      })
    )
});

const createApiService = (): ApiService => ({
  signIn: params =>
    pipeR(
      sequenceReaderGen(askLogger(), askTransport()),
      switchMapR(([logger, transport]) => {
        logger.log('api service', 'signing in', params.login);
        return transport.call<AuthData>('signIn', params);
      })
    ),

  signOut: () =>
    pipeR(
      sequenceReaderGen(askLogger(), askTransport(), askAuthData()),
      switchMapR(([logger, transport, getAuthData]) => {
        const authData = getAuthData();
        logger.log('api service', 'signing out', authData.userId);
        return transport.call<void>('signOut', authData);
      })
    ),

  fetchProfile: () =>
    pipeR(
      sequenceReaderGen(askLogger(), askTransport(), askAuthData()),
      switchMapR(([logger, transport, getAuthData]) => {
        const authData = getAuthData();
        logger.log('api service', 'fetch profile', authData.userId);
        return transport.call<ProfileData>('getProfile', authData);
      })
    )
});
