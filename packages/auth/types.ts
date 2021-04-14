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

export enum AuthorizationState {
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

export type State = ADT<{
  [AuthorizationState.Authorized]: AuthData;

  [AuthorizationState.Unauthorized]: {};

  [AuthorizationState.InProgress]: {};

  [AuthorizationState.Error]: ActionError;
}>;

export const initialState: State = {
  _type: AuthorizationState.Unauthorized
};

export type StoreSegment = StoreSegmentType<State, typeof storePart>;
export type ReducerSegment = ReducerSegmentType<StoreSegment>;
export type ThunkAction<T> = ThunkActionType<StoreSegment, T>;

export const actions = {
  set: actionFactory<State>('set'),
  signIn: actionFactory.async<
    AuthParams,
    AuthData,
    ActionError
  >('signIn'),
  signOut: actionFactory.async<void, void, ActionError>('signOut')
};
