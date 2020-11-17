import { actionCreatorFactory } from 'typescript-fsa';

import {
  ActionError,
  ReducerSegmentType,
  StoreSegmentType,
  ThunkActionType,
  ADT
} from '@tsp-wl/utils';

export const storePart = '@tsp-wl/profile';

const actionFactory = actionCreatorFactory(storePart);

export enum ProfileState {
  Loaded = 'Loaded',
  Empty = 'Empty',
  InProgress = 'InProgress',
  Error = 'Error'
}

export type State = ADT<{
  [ProfileState.Loaded]: {
    userId: string;
    name: string;
    email: string;
  };

  [ProfileState.Empty]: {};

  [ProfileState.InProgress]: {};

  [ProfileState.Error]: { error: ActionError };
}>;

export const initialState: State = {
  _type: ProfileState.Empty
};

export type StoreSegment = StoreSegmentType<State, typeof storePart>;
export type ReducerSegment = ReducerSegmentType<StoreSegment>;
export type ThunkAction<T> = ThunkActionType<StoreSegment, T>;

export const actions = {
  set: actionFactory<State>('set')
};
