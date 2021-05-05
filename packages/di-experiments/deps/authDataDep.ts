import { pipe } from 'fp-ts/function';
import { readerObservable as RO } from 'fp-ts-rxjs';

import { AuthData } from '@tsp-wl/auth';

export interface AuthDataDep {
  getAuthData: () => AuthData;
}

export const askAuthData = () =>
  pipe(
    RO.ask<AuthDataDep>(),
    RO.map(deps => deps.getAuthData)
  );
