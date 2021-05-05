import { pipe } from 'fp-ts/function';
import { readerObservable as RO } from 'fp-ts-rxjs';

export interface Logger {
  log: (category: string, ...params: unknown[]) => void;
}

export interface LoggerDep {
  logger: Logger;
}

export const askLogger = () =>
  pipe(
    RO.ask<LoggerDep>(),
    RO.map(deps => deps.logger)
  );

export const createConsoleLoggerDep = (): LoggerDep => ({
  logger: {
    log: console.log
  }
});
