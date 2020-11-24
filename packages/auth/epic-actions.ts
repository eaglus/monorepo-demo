import { ApiDeps } from '@tsp-wl/api';
import { Epic } from '@tsp-wl/utils';

import { StoreSegment } from './types';

export const authEpic: Epic<StoreSegment, ApiDeps> = (
  _actions$,
  _state$,
  _deps
) => {
  return _actions$;
};
