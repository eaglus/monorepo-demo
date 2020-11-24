import { LoggerDeps } from '@tsp-wl/logger';
import { Epic } from '@tsp-wl/utils';

import { StoreSegment } from './types';

export const profileEpic: Epic<StoreSegment, LoggerDeps> = (
  _actions$,
  _state$,
  _deps
) => {
  return _actions$;
};
