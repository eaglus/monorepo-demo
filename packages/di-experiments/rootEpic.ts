import { createConsoleLoggerDep } from './deps/loggerDep';
import { createFakeTransportDep } from './deps/apiTransportDep';
import { createApiServiceDep } from './deps/apiServiceDep';

import { epicAuth } from './epics/auth-profile-epic';
import { createRootEpic } from './createRootEpic';

export const rootEpic = createRootEpic([epicAuth], {
  ...createConsoleLoggerDep(),
  ...createFakeTransportDep(),
  ...createApiServiceDep()
});
