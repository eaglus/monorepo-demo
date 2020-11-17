import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { uniq, flattenDeep } from 'lodash';

import thunk from '@tsp-private/redux-thunk';

import {
  reducerSegment as profileReducerSegment,
  middlewares as profileMiddlewares,
  StoreSegment as ProfileStoreSegment
} from '@tsp-wl/profile';

type StoreSegment = ProfileStoreSegment;

const reducer = combineReducers({
  ...profileReducerSegment
});

const middlewares = (uniq(
  flattenDeep([thunk, ...profileMiddlewares])
) as unknown) as Middleware<unknown, StoreSegment>[];

export function configureStore() {
  return createStore(
    reducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}
