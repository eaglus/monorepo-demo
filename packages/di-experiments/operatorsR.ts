import { Observable, OperatorFunction, ObservableInput, ObservedValueOf } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ReaderObservable } from 'fp-ts-rxjs/lib/ReaderObservable';

import * as R from 'fp-ts/lib/Reader';
import { Reader } from 'fp-ts/lib/Reader';

export const applyRxOperator = <In, Out>(operator: OperatorFunction<In, Out>) =>
  R.map(operator);

export const mapErrorR = <Out>(handler: (error: any) => Out) =>
  applyRxOperator(catchError(error => [handler(error)]));

//chain: (fa, f) => fa.pipe(mergeMap(f)),  

//export declare function switchMap<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>;

const chainWith = <T, O extends ObservableInput<any>>(
  operatorFn: (project: (value: T, index: number) => O) => OperatorFunction<T, ObservedValueOf<O>>
) => <Deps>(project: (value: T, index: number) => Reader<Deps, O>) => (ma: ReaderObservable<Deps, T>): ReaderObservable<Deps, ObservedValueOf<O>> => (
  R.chain<Observable<T>, Deps, Observable<ObservedValueOf<O>>>(
    obs => deps => obs.pipe(
      operatorFn((value: T, index: number) => project(value, index)(deps))
    )
  )(ma)
);

// export const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B> = chainW

//   ) => <Deps>(
//   fa: ReaderObservable<Deps, T>, 
//   f: (value: T) => ReaderObservable<Deps, T>
// ) => null;

export const switchMapR = <In, Deps, O extends ObservableInput<any>>(project: (value: In, index: number) => Reader<Deps, O>) =>
  R.chain<Observable<In>, Deps, Observable<ObservedValueOf<O>>>(
    obs => deps => obs.pipe(switchMap((value, index) => project(value, index)(deps)))
  );

export const catchErrorR = <In, Deps, O extends ObservableInput<any>>(selector: (err: any, caught: Observable<In>) => Reader<Deps, O>) =>
  R.chain<Observable<In>, Deps, Observable<In | ObservedValueOf<O>>>(
    obs => deps => obs.pipe(
      catchError(
        (err, caught) => selector(err, caught)(deps)
      )
    )
  );

  export const switchMapR2 = chainWith(switchMap);
