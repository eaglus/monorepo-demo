import { Observable, OperatorFunction, ObservableInput, ObservedValueOf, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ActionCreator, AnyAction } from 'typescript-fsa';

import * as R from 'fp-ts/lib/Reader';
import { Reader } from 'fp-ts/lib/Reader';
import { pipe } from 'fp-ts/lib/pipeable';
import { ReaderObservableEither } from 'fp-ts-rxjs/lib/ReaderObservableEither';
import { ReaderObservable } from 'fp-ts-rxjs/lib/ReaderObservable';
import { readerObservable as RO } from 'fp-ts-rxjs/lib';

import { ofActionPayload } from '@tsp-wl/utils/redux-utils';
//import { profileActions } from '@tsp-wl/profile';
import { authActions, AuthParams, AuthData } from '@tsp-wl/auth';

import { pipeR } from './pipeR';
import { applyRxOperator, mapErrorR, catchErrorR, switchMapR, switchMapR2 } from './operatorsR';

//======== logger.ts ========
interface Logger {
  log: (category: string, ...params: unknown[]) => void;
}

interface LoggerDep {
  logger: Logger;
}

const askLogger = <Deps extends LoggerDep = LoggerDep>() =>
  pipe(
    R.ask<Deps>(),
    R.map(deps => deps.logger)
  );

const createConsoleLoggerDep = (): LoggerDep => ({
  logger: {
    log: console.log
  }
});

//========= api-transort.ts =====
interface ApiTransport {
  call: <R>(method: string, ...params: unknown[]) => Observable<R>;
}

interface ApiTransportDep {
  transport: ApiTransport;
}

const createFakeTransport = () =>
  pipe(
    askLogger(),
    R.map(logger => {
      const result: ApiTransport = {
        call(method, params) {
          logger.log(method, params);
          return from([]);
        }
      };
      return result;
    })
  );

const askTransport = <Deps extends ApiTransportDep = ApiTransportDep>() =>
  pipe(
    R.ask<Deps>(),
    R.map(deps => deps.transport)
  );

//========= api-transort.ts =====

interface ActionsDep {
  actions$: Observable<AnyAction>;
}

const askActions = <Deps extends ActionsDep = ActionsDep>() =>
  pipe(
    R.ask<Deps>(),
    R.map(deps => deps.actions$)
  );

const ofActionPayloadR = <Payload>(actionCreator: ActionCreator<Payload>) =>
  pipe(askActions(), applyRxOperator(ofActionPayload(actionCreator)));

//============ epic.ts ===============

const fetchSignIn = (params: AuthParams) =>
  pipeR(
    RO.ask<ApiTransportDep & LoggerDep>(),
    RO.chain(({ transport, logger }) => {
      logger.log('Sign in as', params.login);
      return RO.fromObservable(transport.call<AuthData>('sign-in', params));
    })
  );

const epicAuth = pipeR(
  ofActionPayloadR(authActions.signIn.started),
  switchMapR(params =>
    pipeR(
      fetchSignIn(params),
      RO.map(authData =>
        authActions.signIn.done({
          params,
          result: authData
        })
      ),
      mapErrorR(error => authActions.signIn.failed({
        params,
        error
      }))
    )
  )
);


const epicAuth1 = pipeR(
  ofActionPayloadR(authActions.signIn.started),
  switchMapR(params =>
    pipeR(
      fetchSignIn(params),
      RO.map(authData =>
        authActions.signIn.done({
          params,
          result: authData
        })
      ),
      catchErrorR(error =>
        RO.of(
          [authActions.signIn.failed({
            params,
            error
          })]
        )
      )
    )
  )
);
