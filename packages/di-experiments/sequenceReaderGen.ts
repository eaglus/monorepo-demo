import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';

export declare function sequenceReaderGen<A, R>(
  a: ReaderObservable<A, R>
): ReaderObservable<A, [R]>;

export declare function sequenceReaderGen<A, B, R1, R2>(
  a: ReaderObservable<R1, A>,
  b: ReaderObservable<R2, B>
): ReaderObservable<R1 & R2, [A, B]>;

export declare function sequenceReaderGen<A, B, C, R1, R2, R3>(
  a: ReaderObservable<R1, A>,
  b: ReaderObservable<R2, B>,
  c: ReaderObservable<R3, C>
): ReaderObservable<R1 & R2 & R3, [A, B, C]>;
