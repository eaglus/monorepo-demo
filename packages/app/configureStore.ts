import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from '@tsp-private/redux-thunk';

import { reducerSegment as authReducerSegment } from '@tsp-wl/auth';

const reducer = combineReducers({
  ...authReducerSegment
});

export function configureStore() {
  return createStore(
    reducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
