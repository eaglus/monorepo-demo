import { filter } from 'rxjs/operators';
import { readerObservable as RO } from 'fp-ts-rxjs';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { pipe } from 'fp-ts/function';

import { ProfileData } from '@tsp-wl/profile';
import {
  AuthParams,
  AuthData,
  selectAuthorizedData,
  AuthStoreSegment
} from '@tsp-wl/auth';

import { combineLatestR } from '../operators/combineOperatorsR';

import { switchMapR, mapObservable } from '../operators/pipeOperatorsR';

import { ApiTransportDep, askTransport } from './apiTransportDep';
import { askLogger, LoggerDep } from './loggerDep';
import { askStateSelect, StoreDep } from './storeDep';

export interface ApiService {
  signIn(
    params: AuthParams
  ): ReaderObservable<ApiTransportDep & LoggerDep, AuthData>;

  signOut(): ReaderObservable<
    ApiTransportDep & LoggerDep & StoreDep<AuthStoreSegment>,
    void
  >;

  fetchProfile(): ReaderObservable<
    ApiTransportDep & LoggerDep & StoreDep<AuthStoreSegment>,
    ProfileData
  >;
}

export interface ApiServiceDep {
  apiService: ApiService;
}

export const askApiService = () =>
  pipe(
    RO.ask<ApiServiceDep>(),
    RO.map(deps => deps.apiService)
  );

const askAuthData = pipe(
  askStateSelect(selectAuthorizedData),
  mapObservable(filter((data): data is AuthData => data !== undefined))
);

export const createApiService = (): ApiService => ({
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
      combineLatestR([askLogger(), askTransport(), askAuthData]),
      switchMapR(([logger, transport, authData]) => {
        logger.log('api service', 'signing out', authData.userId);
        return transport.call<void>('signOut', authData);
      })
    ),

  fetchProfile: () =>
    pipe(
      combineLatestR([askLogger(), askTransport(), askAuthData]),
      switchMapR(([logger, transport, authData]) => {
        logger.log('api service', 'fetch profile', authData.userId);
        return transport.call<ProfileData>('getProfile', authData);
      })
    )
});

export const createApiServiceDep = (): ApiServiceDep => ({
  apiService: createApiService()
});
