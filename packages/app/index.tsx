import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';

import { ClientRoot } from './clientRoot';

function runApplication() {
  const rootElement = document.getElementById('root');
  ReactDOM.render(<ClientRoot />, rootElement);
}

runApplication();
