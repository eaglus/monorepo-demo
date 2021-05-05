import { merge } from 'rxjs';
import { Epic } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { ActionsDep } from './deps/actionsDep';
import { StoreDep, StateOfStoreDep } from './deps/storeDep';
import { combineWithSum } from './operators/combineOperatorsR';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRootEpic<Deps extends ActionsDep & StoreDep<any>>(
  rObs: ReaderObservable<Deps, AnyAction>[],
  deps: Omit<Deps, keyof ActionsDep | keyof StoreDep<unknown>>
) {
  const mergedObs = combineWithSum(merge, rObs);

  type State = StateOfStoreDep<Deps>;

  const rootEpic: Epic<AnyAction, AnyAction, State, never> = (
    action$,
    state$
  ) => {
    const actionsDep: ActionsDep = {
      actions$: action$
    };

    const storeDep: StoreDep<State> = {
      state$
    };

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const fullDeps: Deps = {
      ...deps,
      ...actionsDep,
      ...storeDep
    } as Deps;

    return mergedObs(fullDeps);
  };
  return rootEpic;
}
