import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthWrapper } from '@tsp-wl/auth-components';

import { ClientRoot } from './clientRoot';
import { configureStore } from './configureStore';

function runApplication() {
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

runApplication();
