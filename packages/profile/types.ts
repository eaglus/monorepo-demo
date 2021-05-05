import { actionCreatorFactory } from 'typescript-fsa';

import { ADT } from '@tsp-wl/utils';
import {
  ActionError,
  ReducerSegmentType,
  StoreSegmentType,
  ThunkActionType
} from '@tsp-wl/utils';
import { AuthStoreSegment as AuthStoreSegment } from '@tsp-wl/auth';

export const storePart = '@tsp-wl/profile';

const actionFactory = actionCreatorFactory(storePart);

export enum ProfileStatus {
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

export type ProfileState = ADT<{
  [ProfileStatus.Loaded]: ProfileData;

  [ProfileStatus.Empty]: {};

  [ProfileStatus.InProgress]: {};

  [ProfileStatus.Error]: ActionError;
}>;

export const initialState: ProfileState = {
  _type: ProfileStatus.Empty
};

type ProfileStoreSegment = StoreSegmentType<ProfileState, typeof storePart>;
export type ProfileFullStoreSegment = ProfileStoreSegment & AuthStoreSegment;

export type ReducerSegment = ReducerSegmentType<ProfileFullStoreSegment>;
export type ThunkAction<T> = ThunkActionType<ProfileFullStoreSegment, T>;

export const actions = {
  set: actionFactory<ProfileState>('set'),
  load: actionFactory.async<void, ProfileData, ActionError>('load')
};
