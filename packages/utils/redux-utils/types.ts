import { AnyAction } from 'typescript-fsa';

type FsaDispatch = {
  (action: AnyAction): void;
};

type ThunkAction<T = unknown> = (
  dispatch: Dispatch,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  getState: () => any
) => T | Promise<T>;

export type NonThunkDispatch = FsaDispatch;

export type ThunkDispatch = {
  <T>(thunkAction: ThunkAction<T>): T | Promise<T>;
};

export type Dispatch = ThunkDispatch & NonThunkDispatch;

export type StoreSegmentType<State extends object, Part extends string> = {
  [key in Part]: State;
};

export type ReducerSegmentType<StoreSegmentType extends object> = {
  [key in keyof StoreSegmentType]: (
    state: StoreSegmentType[key] | undefined,
    action: AnyAction
  ) => StoreSegmentType[key];
};

export type ThunkActionType<StoreSegments extends object, T = unknown> = (
  dispatch: Dispatch,
  getState: () => StoreSegments
) => T | Promise<T>;
