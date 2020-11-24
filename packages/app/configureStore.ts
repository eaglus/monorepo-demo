import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware
} from 'redux';
import { AnyAction } from 'typescript-fsa';
import { from } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { uniq, flattenDeep } from 'lodash';

import thunk from '@tsp-private/redux-thunk';

import { combineEpics } from '@tsp-wl/utils';

import {
  reducerSegment as profileReducerSegment,
  middlewares as profileMiddlewares,
  StoreSegment as ProfileStoreSegment,
  profileEpic
} from '@tsp-wl/profile';

import { authEpic } from '@tsp-wl/auth';

type StoreSegment = ProfileStoreSegment;

const rootEpic = combineEpics([profileEpic, authEpic]);

rootEpic(
  ActionsObservable.of<AnyAction>({ type: 'a' }),
  from([]),
  {
    api: {
      call<Result>(_method: string, _args: unknown[]): Promise<Result> {
        return Promise.resolve(null) as any;
      }
    },
    logger: {
      log(_category: string, ..._args) {
        console.log(_category);
      }
    }
  }
);

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
