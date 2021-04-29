import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

export declare function concatToLastR<A, R>(
  a: ReaderObservable<R, A>
): ReaderObservable<R, A>;

export declare function concatToLastR<A, B, R1, R2>(
  a: ReaderObservable<R1, A>,
  b: ReaderObservable<R2, B>
): ReaderObservable<R1 & R2, B>;

export declare function concatToLastR<A, B, C, R1, R2, R3>(
  a: ReaderObservable<R1, A>,
  b: ReaderObservable<R2, B>,
  c: ReaderObservable<R3, C>
): ReaderObservable<R1 & R2 & R3, C>;

export declare function concatToLastR<A, B, C, D, R1, R2, R3, R4>(
  a: ReaderObservable<R1, A>,
  b: ReaderObservable<R2, B>,
  c: ReaderObservable<R3, C>,
  d: ReaderObservable<R4, D>
): ReaderObservable<R1 & R2 & R3 & R4, D>;
