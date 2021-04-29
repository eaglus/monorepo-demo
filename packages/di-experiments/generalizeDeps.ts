import { Reader } from 'fp-ts/Reader';

export declare function generalizeDeps<A, R>(a: Reader<A, R>): [Reader<A, R>];

export declare function generalizeDeps<A, B, R1, R2>(
  a: Reader<R1, A>,
  b: Reader<R2, B>
): [Reader<R1 & R2, A>, Reader<R1 & R2, B>];

export declare function generalizeDeps<A, B, C, R1, R2, R3>(
  a: Reader<R1, A>,
  b: Reader<R2, B>,
  c: Reader<R3, C>
): [Reader<R1 & R2 & R3, A>, Reader<R1 & R2 & R3, B>, Reader<R1 & R2 & R3, C>];
