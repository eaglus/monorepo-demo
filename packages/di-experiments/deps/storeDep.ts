import { Observable } from 'rxjs';

import * as RO from 'fp-ts-rxjs/ReaderObservable';
import * as R from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function';

export interface StoreDep<State> {
  _stateType?: State;
  state$: Observable<State>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateOfStoreDep<O> = O extends StoreDep<any>
  ? NonNullable<O['_stateType']>
  : never;

export const askState = <State>() =>
  pipe(
    R.ask<StoreDep<State>>(),
    R.map(deps => deps.state$)
  );

export const askStateSelect = <State, T>(selector: (state: State) => T) =>
  pipe(askState<State>(), RO.map(selector));
