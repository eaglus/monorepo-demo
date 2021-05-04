import {
  combineLatest,
  concat,
  ObservableInput,
  Observable,
  ObservedValueOf
} from 'rxjs';
import { Reader } from 'fp-ts/Reader';
import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CombinerInterfaceIn {
  <O1 extends ObservableInput<any>>(sources: [O1]): Observable<
    [ObservedValueOf<O1>]
  >;
  <O1 extends ObservableInput<any>, O2 extends ObservableInput<any>>(
    sources: [O1, O2]
  ): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>]>;
  <
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>
  >(
    sources: [O1, O2, O3]
  ): Observable<
    [ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>]
  >;
  <
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>
  >(
    sources: [O1, O2, O3, O4]
  ): Observable<
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>
    ]
  >;
  <
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>,
    O5 extends ObservableInput<any>
  >(
    sources: [O1, O2, O3, O4, O5]
  ): Observable<
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>,
      ObservedValueOf<O5>
    ]
  >;
  <
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>,
    O5 extends ObservableInput<any>,
    O6 extends ObservableInput<any>
  >(
    sources: [O1, O2, O3, O4, O5, O6]
  ): Observable<
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>,
      ObservedValueOf<O5>,
      ObservedValueOf<O6>
    ]
  >;
  <O extends ObservableInput<any>>(sources: O[]): Observable<
    ObservedValueOf<O>[]
  >;
}

interface CombinerInterfaceOut {
  <R1, O1 extends ObservableInput<any>>(
    sources: [Reader<R1, O1>]
  ): ReaderObservable<R1, [ObservedValueOf<O1>]>;

  <R1, R2, O1 extends ObservableInput<any>, O2 extends ObservableInput<any>>(
    sources: [Reader<R1, O1>, Reader<R2, O2>]
  ): ReaderObservable<R1 & R2, [ObservedValueOf<O1>, ObservedValueOf<O2>]>;

  <
    R1,
    R2,
    R3,
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>
  >(
    sources: [Reader<R1, O1>, Reader<R2, O2>, Reader<R3, O3>]
  ): ReaderObservable<
    R1 & R2 & R3,
    [ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>]
  >;

  <
    R1,
    R2,
    R3,
    R4,
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>
  >(
    sources: [Reader<R1, O1>, Reader<R2, O2>, Reader<R3, O3>, Reader<R4, O4>]
  ): ReaderObservable<
    R1 & R2 & R3 & R4,
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>
    ]
  >;

  <
    R1,
    R2,
    R3,
    R4,
    R5,
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>,
    O5 extends ObservableInput<any>
  >(
    sources: [
      Reader<R1, O1>,
      Reader<R2, O2>,
      Reader<R3, O3>,
      Reader<R4, O4>,
      Reader<R5, O5>
    ]
  ): ReaderObservable<
    R1 & R2 & R3 & R4 & R5,
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>,
      ObservedValueOf<O5>
    ]
  >;

  <
    R1,
    R2,
    R3,
    R4,
    R5,
    R6,
    O1 extends ObservableInput<any>,
    O2 extends ObservableInput<any>,
    O3 extends ObservableInput<any>,
    O4 extends ObservableInput<any>,
    O5 extends ObservableInput<any>,
    O6 extends ObservableInput<any>
  >(
    sources: [
      Reader<R1, O1>,
      Reader<R2, O2>,
      Reader<R3, O3>,
      Reader<R4, O4>,
      Reader<R5, O5>,
      Reader<R6, O6>
    ]
  ): ReaderObservable<
    R1 & R2 & R3 & R4 & R5 & R6,
    [
      ObservedValueOf<O1>,
      ObservedValueOf<O2>,
      ObservedValueOf<O3>,
      ObservedValueOf<O4>,
      ObservedValueOf<O5>,
      ObservedValueOf<O6>
    ]
  >;

  <R, O extends ObservableInput<any>>(
    sources: Reader<R, O>[]
  ): ReaderObservable<R, ObservedValueOf<O>[]>;
}

export declare function combineWithC(
  combiner: CombinerInterfaceIn
): CombinerInterfaceOut;

export declare function combineWith<R1, O1 extends ObservableInput<any>>(
  combiner: CombinerInterfaceIn,
  sources: [Reader<R1, O1>]
): ReaderObservable<R1, [ObservedValueOf<O1>]>;

export declare function combineWith<
  R1,
  R2,
  O1 extends ObservableInput<any>,
  O2 extends ObservableInput<any>
>(
  combiner: CombinerInterfaceIn,
  sources: [Reader<R1, O1>, Reader<R2, O2>]
): ReaderObservable<R1 & R2, [ObservedValueOf<O1>, ObservedValueOf<O2>]>;

export declare function combineWith<
  R1,
  R2,
  R3,
  O1 extends ObservableInput<any>,
  O2 extends ObservableInput<any>,
  O3 extends ObservableInput<any>
>(
  combiner: CombinerInterfaceIn,
  sources: [Reader<R1, O1>, Reader<R2, O2>, Reader<R3, O3>]
): ReaderObservable<
  R1 & R2 & R3,
  [ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>]
>;

export declare function combineWith<
  R1,
  R2,
  R3,
  R4,
  O1 extends ObservableInput<any>,
  O2 extends ObservableInput<any>,
  O3 extends ObservableInput<any>,
  O4 extends ObservableInput<any>
>(
  combiner: CombinerInterfaceIn,
  sources: [Reader<R1, O1>, Reader<R2, O2>, Reader<R3, O3>, Reader<R4, O4>]
): ReaderObservable<
  R1 & R2 & R3 & R4,
  [
    ObservedValueOf<O1>,
    ObservedValueOf<O2>,
    ObservedValueOf<O3>,
    ObservedValueOf<O4>
  ]
>;

export declare function combineWith<
  R1,
  R2,
  R3,
  R4,
  R5,
  O1 extends ObservableInput<any>,
  O2 extends ObservableInput<any>,
  O3 extends ObservableInput<any>,
  O4 extends ObservableInput<any>,
  O5 extends ObservableInput<any>
>(
  combiner: CombinerInterfaceIn,
  sources: [
    Reader<R1, O1>,
    Reader<R2, O2>,
    Reader<R3, O3>,
    Reader<R4, O4>,
    Reader<R5, O5>
  ]
): ReaderObservable<
  R1 & R2 & R3 & R4 & R5,
  [
    ObservedValueOf<O1>,
    ObservedValueOf<O2>,
    ObservedValueOf<O3>,
    ObservedValueOf<O4>,
    ObservedValueOf<O5>
  ]
>;

export declare function combineWith<
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  O1 extends ObservableInput<any>,
  O2 extends ObservableInput<any>,
  O3 extends ObservableInput<any>,
  O4 extends ObservableInput<any>,
  O5 extends ObservableInput<any>,
  O6 extends ObservableInput<any>
>(
  combiner: CombinerInterfaceIn,
  sources: [
    Reader<R1, O1>,
    Reader<R2, O2>,
    Reader<R3, O3>,
    Reader<R4, O4>,
    Reader<R5, O5>,
    Reader<R6, O6>
  ]
): ReaderObservable<
  R1 & R2 & R3 & R4 & R5 & R6,
  [
    ObservedValueOf<O1>,
    ObservedValueOf<O2>,
    ObservedValueOf<O3>,
    ObservedValueOf<O4>,
    ObservedValueOf<O5>,
    ObservedValueOf<O6>
  ]
>;

export declare function combineWith<R, O extends ObservableInput<any>>(
  combiner: CombinerInterfaceIn,
  sources: Reader<R, O>[]
): ReaderObservable<R, ObservedValueOf<O>[]>;

export const combineLatestR = combineWithC(combineLatest);
export const concatR = combineWithC(concat);
