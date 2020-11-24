import { Observable } from 'rxjs';
import { AnyAction } from 'typescript-fsa';
import { combineEpics as combineEpicsRedux } from 'redux-observable';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Epic<State, Deps> = (
  actions$: Observable<AnyAction>,
  state$: Observable<State>,
  deps: Deps
) => Observable<AnyAction>;

type CombineEpics<
  Epics extends ((actions$: any, state$: any, deps: any) => any)[]
> = Epics extends ((
  actions$: infer Actions,
  state$: Observable<infer State>,
  deps: infer Deps
) => infer R)[]
  ? (actions$: Actions, state$: Observable<State>, deps: Deps) => R
  : never;

export function combineEpics<
  Epics extends ((action: any, state: any, deps: any) => any)[]
>(epics: Epics): CombineEpics<Epics> {
  return combineEpicsRedux(...epics) as CombineEpics<Epics>;
}
