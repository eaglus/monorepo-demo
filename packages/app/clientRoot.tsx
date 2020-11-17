import { Route, Link, Switch, Redirect } from 'react-router-dom';

import { Layout } from './layout';

export function ClientRoot() {
  return (
    <div>
      <Switch>
        <Route path={'/profile'}>
          <Layout title={'Profile'} requiresAuthorization={true}>
            <Link to={'/'}>{'Navigate to root'}</Link>
          </Layout>
        </Route>
        <Route path={'/login'}>
          <Layout title={'Login'} requiresAuthorization={true}>
            <Redirect to={'/'} />
          </Layout>
        </Route>
        <Route path={'/'}>
          <Layout title={'Root'} requiresAuthorization={false}>
            <Link to={'/profile'}>{'Navigate to profile'}</Link>
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}
