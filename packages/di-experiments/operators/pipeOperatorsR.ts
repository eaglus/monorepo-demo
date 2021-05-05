import {
  Observable,
  OperatorFunction,
  ObservableInput,
  ObservedValueOf,
  from
} from 'rxjs';
import {
  catchError,
  switchMap,
  mergeMap,
  map,
  concatMap
} from 'rxjs/operators';

import * as R from 'fp-ts/Reader';
import { Reader } from 'fp-ts/Reader';
import * as RO from 'fp-ts-rxjs/ReaderObservable';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const chainWith = <R2, T, O extends ObservableInput<any>>(
  operatorFn: (
    project: (value: any, index: number) => any
  ) => OperatorFunction<any, any>,
  project: (value: T, index: number) => Reader<R2, O>
) =>
  R.chainW<R2, Observable<T>, Observable<ObservedValueOf<O>>>(obs => deps => {
    const operatorResult = operatorFn((value: T, index: number) =>
      project(value, index)(deps)
    ) as OperatorFunction<T, ObservedValueOf<O>>;

    return obs.pipe(operatorResult);
  });

export const chainWithC = (
  operatorFn: (
    project: (value: any, index: number) => ObservableInput<any>
  ) => OperatorFunction<any, any>
) => <R2, T, O extends ObservableInput<any>>(
  project: (value: T, index: number) => Reader<R2, O>
) => chainWith(operatorFn, project);

export const mapR = <R, T, O>(project: (value: T, index: number) => O) =>
  R.chain<Observable<T>, R, Observable<O>>(obs => () => {
    const operatorResult = map((value: T, index: number) =>
      project(value, index)
    ) as OperatorFunction<T, O>;

    return obs.pipe(operatorResult);
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const catchErrorR = <In, R2, O extends ObservableInput<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: (err: any, caught: Observable<In>) => Reader<R2, O>
) =>
  R.chainW<R2, Observable<In>, Observable<In | ObservedValueOf<O>>>(
    obs => deps =>
      obs.pipe(catchError((err, caught) => selector(err, caught)(deps)))
  );

export const mapObservable = <In, Out>(operator: OperatorFunction<In, Out>) =>
  R.map(operator);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapErrorR = <Out>(handler: (error: any) => Out) =>
  mapObservable(catchError(error => () => [handler(error)]));

export const catchErrorO = <In, O extends ObservableInput<any>>(
  handler: (error: any, caught: Observable<In>) => O
) => mapObservable(catchError(handler));

export const ofR = RO.of;

export function fromR<R, O extends ObservableInput<any>>(
  input: O
): Reader<R, Observable<ObservedValueOf<O>>> {
  return RO.fromObservable(from(input));
}

export const concatMapR = chainWithC(concatMap);
export const mergeMapR = chainWithC(mergeMap);
export const switchMapR = chainWithC(switchMap);
export const chainR = switchMapR;
