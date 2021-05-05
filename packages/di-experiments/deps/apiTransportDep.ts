import { ReaderObservable } from 'fp-ts-rxjs/ReaderObservable';
import { pipe } from 'fp-ts/function';
import { readerObservable as RO } from 'fp-ts-rxjs';

import { switchMapR } from '../operators/pipeOperatorsR';

import { askLogger, LoggerDep } from './loggerDep';

export interface ApiTransport {
  call: <Result>(
    method: string,
    ...params: unknown[]
  ) => ReaderObservable<LoggerDep, Result>;
}

export interface ApiTransportDep {
  transport: ApiTransport;
}

export const askTransport = () =>
  pipe(
    RO.ask<ApiTransportDep>(),
    RO.map(deps => deps.transport)
  );

const createFakeTransport = (): ApiTransport => ({
  call: (method, params) =>
    pipe(
      askLogger(),
      switchMapR(logger => {
        logger.log('fake transport', method, params);
        return RO.zero;
      })
    )
});

export const createFakeTransportDep = (): ApiTransportDep => ({
  transport: createFakeTransport()
});
