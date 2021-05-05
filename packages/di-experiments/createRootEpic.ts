import { merge } from 'rxjs';
import { Epic } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

import { ActionsDep } from './deps/actionsDep';
import { combineWithSum } from './operators/combineOperatorsR';

export function createRootEpic<Deps extends ActionsDep>(
  rObs: ReaderObservable<Deps, AnyAction>[],
  deps: Omit<Deps, keyof ActionsDep>
): Epic {
  const mergedObs = combineWithSum(merge, rObs);

  const rootEpic: Epic = (action$, state$) => {
    const actionsDep: ActionsDep = {
      actions$: action$
    };

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const fullDeps: Deps = {
      ...deps,
      ...actionsDep
    } as Deps;

    return mergedObs(fullDeps);
  };
  return rootEpic;
}

