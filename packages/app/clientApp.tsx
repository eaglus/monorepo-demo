import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthWrapper } from '@tsp-wl/auth-components';
import { treeShakingTest41 } from '@tsp-wl/utils';

import { ClientRoot } from './clientRoot';
import { configureStore } from './configureStore';

export function runApplication() {
  treeShakingTest41();

  const store = configureStore();
  const rootElement = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AuthWrapper>
          <ClientRoot />
        </AuthWrapper>
      </Router>
    </Provider>,
    rootElement
  );
}
