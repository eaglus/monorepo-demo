import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AnyAction, ActionCreator, Action } from 'typescript-fsa';
import {
  combineEpics as combineEpicsRedux,
  createEpicMiddleware as createEpicMiddlewareRedux
} from 'redux-observable';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ofAction<Payload>(actionCreator: ActionCreator<Payload>) {
  return filter<AnyAction, Action<Payload>>(actionCreator.match);
}

export function ofActionPayload<Payload>(
  actionCreator: ActionCreator<Payload>
) {
  return pipe(
    filter<AnyAction, Action<Payload>>(actionCreator.match),
    map(action => action.payload)
  );
}

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

interface Options<D> {
  dependencies: D;
}

export function createEpicMiddleware<S, D>(
  rootEpic: Epic<S, D>,
  options: Options<D>
) {
  const middleware = createEpicMiddlewareRedux(options);
  return {
    middleware,
    run: () => middleware.run(rootEpic as any)
  };
}
