import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { uniq, flattenDeep, camelCase } from 'lodash-es';

import thunk from '@tsp-private/redux-thunk';

import { timeoutPromise } from '@tsp-wl/utils';
import { combineEpics, createEpicMiddleware } from '@tsp-wl/utils';

import {
  reducerSegment as profileReducerSegment,
  middlewares as profileMiddlewares,
  ProfileFullStoreSegment as ProfileStoreSegment,
  epics
} from '@tsp-wl/profile';

type StoreSegment = ProfileStoreSegment;

const reducer = combineReducers({
  ...profileReducerSegment
});

const middlewares = (uniq(
  flattenDeep(profileMiddlewares)
) as unknown) as Middleware<unknown, StoreSegment>[];

export function configureStore() {
  const rootEpic = combineEpics(epics);
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      logger: {
        log(category: string, ...args: unknown[]) {
          console.log(category, args);
        }
      },
      api: {
        call<Result>(method: string, args: unknown[]): Promise<Result> {
          switch (method) {
            case 'sign-in': {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const arg: any = args[0];
              return timeoutPromise(1000).then(
                () =>
                  (({
                    accessToken: 'accessToken',
                    refreshToken: 'refreshToken',
                    userId: arg.login
                  } as unknown) as Result)
              );
            }

            case 'sign-out': {
              return timeoutPromise(1000).then(
                () => (({} as unknown) as Result)
              );
            }

            case 'profile': {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const userId: any = args[0];

              return timeoutPromise(1000).then(
                () =>
                  (({
                    userId,
                    email: userId + '@email.com',
                    name: camelCase(userId) + ' Pupkin'
                  } as unknown) as Result)
              );
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return Promise.resolve(null as any);
        }
      }
    }
  });

  const store = createStore(
    reducer,
    undefined,
    composeWithDevTools(
      applyMiddleware(thunk, epicMiddleware.middleware, ...middlewares)
    )
  );
  epicMiddleware.run();

  return store;
}
