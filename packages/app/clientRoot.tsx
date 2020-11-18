import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import { Layout } from './layout';

const Profile = loadable(() => import('./routes/profile'));

export function ClientRoot() {
  return (
    <div>
      <Switch>
        <Route path={'/profile'}>
          <Layout title={'Profile'} requiresAuthorization={true}>
            <Profile />
          </Layout>
        </Route>
        <Route path={'/login'}>
          <Layout title={'Login'} requiresAuthorization={true}>
            <Redirect to={'/'} />
          </Layout>
        </Route>
        <Route path={'/'}>
          <Layout title={'Root'} requiresAuthorization={false} />
        </Route>
      </Switch>
    </div>
  );
}
