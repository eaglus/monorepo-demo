import { Route, Switch, Redirect, useRouteMatch, Link } from 'react-router-dom';
import loadable from '@loadable/component';

import styles from './styles.css';

const ProfileEdit = loadable(() => import('../profileEdit'));
const ProfileView = loadable(() => import('../profileView'));

export function ProfileRoot() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path + '/edit'}>
        <h3>Edit</h3>
        <ProfileEdit />
        <Link to={path + '/view'} className={styles.navigate}>
          {'Navigate to root'}
        </Link>
      </Route>
      <Route path={path + '/view'}>
        <h3>View</h3>
        <ProfileView />
        <Link to={path + '/edit'} className={styles.navigate}>
          {'Navigate to edit'}
        </Link>
      </Route>
      <Route path={path}>
        <Redirect to={path + '/view'} />
      </Route>
    </Switch>
  );
}
