import { Reader } from 'fp-ts/Reader';

export declare function pipeR<A, R>(a: Reader<A, R>): Reader<A, R>;

export declare function pipeR<A, B, R1, R2, R3>(
  a: Reader<R1, A>,
  ab: (a: Reader<R2, A>) => Reader<R3, B>
): Reader<R1 & R2 & R3, B>;

export declare function pipeR<A, B, C, R1, R2, R3, R4, R5>(
  a: Reader<R1, A>,
  ab: (a: Reader<R2, A>) => Reader<R3, B>,
  bc: (b: Reader<R4, B>) => Reader<R5, C>
): Reader<R1 & R2 & R3 & R4 & R5, C>;

export declare function pipeR<A, B, C, D, R1, R2, R3, R4, R5, R6, R7>(
  a: Reader<R1, A>,
  ab: (a: Reader<R2, A>) => Reader<R3, B>,
  bc: (b: Reader<R4, B>) => Reader<R5, C>,
  cd: (c: Reader<R6, C>) => Reader<R7, D>
): Reader<R1 & R2 & R3 & R4 & R5 & R6 & R7, D>;

export declare function pipeR<
  A,
  B,
  C,
  D,
  E,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9
>(
  a: Reader<R1, A>,
  ab: (a: Reader<R2, A>) => Reader<R3, B>,
  bc: (b: Reader<R4, B>) => Reader<R5, C>,
  cd: (c: Reader<R6, C>) => Reader<R7, D>,
  de: (d: Reader<R8, D>) => Reader<R9, E>
): Reader<R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9, E>;

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
  a: Reader<R1, A>,
  ab: (a: Reader<R2, A>) => Reader<R3, B>,
  bc: (b: Reader<R4, B>) => Reader<R5, C>,
  cd: (c: Reader<R6, C>) => Reader<R7, D>,
  de: (d: Reader<R8, D>) => Reader<R9, E>,
  ef: (d: Reader<R10, E>) => Reader<R11, F>
): Reader<R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11, F>;
