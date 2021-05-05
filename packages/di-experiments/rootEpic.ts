import { ObservedValueOf } from 'rxjs';
import { Reader } from 'fp-ts/Reader';

import { createConsoleLoggerDep } from './deps/loggerDep';
import { createFakeTransportDep } from './deps/apiTransportDep';
import { createApiServiceDep } from './deps/apiServiceDep';
import { StoreDep } from './deps/storeDep';

import { epicAuth } from './epics/auth-profile-epic';
import { createRootEpic } from './createRootEpic';

type GetDeps<T> = T extends Reader<infer R, any> ? R : never;
type GetState<T> = T extends StoreDep<infer S1> & StoreDep<infer S2>
  ? S1 & S2
  : never;

type SD = GetState<GetDeps<typeof epicAuth>>;

export const rootEpic = createRootEpic([epicAuth], {
  ...createConsoleLoggerDep(),
  ...createFakeTransportDep(),
  ...createApiServiceDep()
});
