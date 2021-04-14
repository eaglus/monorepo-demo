import { ReaderObservable } from 'fp-ts-rxjs/lib/ReaderObservable';

export declare function pipeR<A, R>(a: ReaderObservable<A, R>): ReaderObservable<A, R>;

export declare function pipeR<A, B, R1, R2, R3>(
  a: ReaderObservable<R1, A>,
  ab: (a: ReaderObservable<R2, A>) => ReaderObservable<R3, B>
): ReaderObservable<R1 & R2 & R3, B>;

export declare function pipeR<A, B, C, R1, R2, R3, R4, R5>(
  a: ReaderObservable<R1, A>,
  ab: (a: ReaderObservable<R2, A>) => ReaderObservable<R3, B>,
  bc: (b: ReaderObservable<R4, B>) => ReaderObservable<R5, C>
): ReaderObservable<R1 & R2 & R3 & R4 & R5, C>;

export declare function pipeR<A, B, C, D, R1, R2, R3, R4, R5, R6, R7>(
  a: ReaderObservable<R1, A>,
  ab: (a: ReaderObservable<R2, A>) => ReaderObservable<R3, B>,
  bc: (b: ReaderObservable<R4, B>) => ReaderObservable<R5, C>,
  cd: (c: ReaderObservable<R6, C>) => ReaderObservable<R7, D>
): ReaderObservable<R1 & R2 & R3 & R4 & R5 & R6 & R7, D>;

export declare function pipeR<A, B, C, D, E, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  a: ReaderObservable<R1, A>,
  ab: (a: ReaderObservable<R2, A>) => ReaderObservable<R3, B>,
  bc: (b: ReaderObservable<R4, B>) => ReaderObservable<R5, C>,
  cd: (c: ReaderObservable<R6, C>) => ReaderObservable<R7, D>,
  de: (d: ReaderObservable<R8, D>) => ReaderObservable<R9, E>
): ReaderObservable<R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9, E>;

export declare function pipeR<
  A,
  B,
  C,
  D,
  E,
  F,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11
>(
  a: ReaderObservable<R1, A>,
  ab: (a: ReaderObservable<R2, A>) => ReaderObservable<R3, B>,
  bc: (b: ReaderObservable<R4, B>) => ReaderObservable<R5, C>,
  cd: (c: ReaderObservable<R6, C>) => ReaderObservable<R7, D>,
  de: (d: ReaderObservable<R8, D>) => ReaderObservable<R9, E>,
  ef: (d: ReaderObservable<R10, E>) => ReaderObservable<R11, F>
): ReaderObservable<R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11, F>;
