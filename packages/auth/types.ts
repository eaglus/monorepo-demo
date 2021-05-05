import { actionCreatorFactory } from 'typescript-fsa';

import { ADT } from '@tsp-wl/utils';
import {
  ActionError,
  ReducerSegmentType,
  StoreSegmentType,
  ThunkActionType
} from '@tsp-wl/utils';

export const storePart = '@tsp-wl/auth';

const actionFactory = actionCreatorFactory(storePart);

export enum AuthStatus {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized',
  InProgress = 'InProgress',
  Error = 'Error'
}

export interface AuthParams {
  login: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export type AuthState = ADT<{
  [AuthStatus.Authorized]: AuthData;

  [AuthStatus.Unauthorized]: {};

  [AuthStatus.InProgress]: {};

  [AuthStatus.Error]: ActionError;
}>;

export const initialState: AuthState = {
  _type: AuthStatus.Unauthorized
};

export type AuthStoreSegment = StoreSegmentType<AuthState, typeof storePart>;
export type ReducerSegment = ReducerSegmentType<AuthStoreSegment>;
export type ThunkAction<T> = ThunkActionType<AuthStoreSegment, T>;

export const actions = {
  set: actionFactory<AuthState>('set'),
  signIn: actionFactory.async<AuthParams, AuthData, ActionError>('signIn'),
  signOut: actionFactory.async<void, void, ActionError>('signOut')
};
