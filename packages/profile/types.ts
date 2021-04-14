import { actionCreatorFactory } from 'typescript-fsa';

import { ADT } from '@tsp-wl/utils';
import {
  ActionError,
  ReducerSegmentType,
  StoreSegmentType,
  ThunkActionType
} from '@tsp-wl/utils';
import { StoreSegment as AuthStoreSegment } from '@tsp-wl/auth';

export const storePart = '@tsp-wl/profile';

const actionFactory = actionCreatorFactory(storePart);

export enum ProfileState {
  Loaded = 'Loaded',
  Empty = 'Empty',
  InProgress = 'InProgress',
  Error = 'Error'
}

export type ProfileData = {
  userId: string;
  name: string;
  email: string;
};

export type State = ADT<{
  [ProfileState.Loaded]: ProfileData;

  [ProfileState.Empty]: {};

  [ProfileState.InProgress]: {};

  [ProfileState.Error]: ActionError;
}>;

export const initialState: State = {
  _type: ProfileState.Empty
};

type ProfileStoreSegment = StoreSegmentType<State, typeof storePart>;
export type StoreSegment = ProfileStoreSegment & AuthStoreSegment;

export type ReducerSegment = ReducerSegmentType<StoreSegment>;
export type ThunkAction<T> = ThunkActionType<StoreSegment, T>;

export const actions = {
  set: actionFactory<State>('set'),
  load: actionFactory.async<void, ProfileData, ActionError>('load')
};
