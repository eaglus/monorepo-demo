import { readerObservable as RO } from 'fp-ts-rxjs';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { pipe } from 'fp-ts/function';

import { ProfileData } from '@tsp-wl/profile';
import { AuthParams, AuthData } from '@tsp-wl/auth';

import { combineLatestR } from '../operators/combineOperatorsR';

import { switchMapR } from '../operators/pipeOperatorsR';

import { ApiTransportDep, askTransport } from './apiTransportDep';
import { askLogger, LoggerDep } from './loggerDep';
import { askAuthData, AuthDataDep } from './authDataDep';

export interface ApiService {
  signIn(
    params: AuthParams
  ): ReaderObservable<ApiTransportDep & LoggerDep, AuthData>;

  signOut(): ReaderObservable<ApiTransportDep & LoggerDep & AuthDataDep, void>;

  fetchProfile(): ReaderObservable<
    ApiTransportDep & LoggerDep & AuthDataDep,
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

export const createApiServiceDep = (): ApiServiceDep => ({
  apiService: createApiService()
});
