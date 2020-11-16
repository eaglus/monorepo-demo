import { actionCreatorFactory } from 'typescript-fsa';

import {
  ActionError,
  ReducerSegmentType,
  StoreSegmentType,
  ThunkActionType,
  ADT
} from '@tsp-wl/utils';

export const storePart = '@tsp-wl/auth';

const actionFactory = actionCreatorFactory(storePart);

export enum AuthorizationState {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized',
  InProgress = 'InProgress',
  Error = 'Error'
}

export type State = ADT<{
  [AuthorizationState.Authorized]: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };

  [AuthorizationState.Unauthorized]: {};

  [AuthorizationState.InProgress]: {};

  [AuthorizationState.Error]: { error: ActionError };
}>;

export const initialState: State = {
  _type: AuthorizationState.Unauthorized
};

export type StoreSegment = StoreSegmentType<State, typeof storePart>;
export type ReducerSegment = ReducerSegmentType<StoreSegment>;
export type ThunkAction<T> = ThunkActionType<StoreSegment, T>;

export const actions = {
  set: actionFactory<State>('set')
};
