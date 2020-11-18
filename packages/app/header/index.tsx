import { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { authWrapperContext } from '@tsp-wl/auth-components';

import styles from './styles.css';

interface Props {
  title: string;
}

export function Header(props: Props) {
  const { headerWidget } = useContext(authWrapperContext);
  return (
    <div className={styles.common}>
      <h2 className={styles.title}>{props.title}</h2>
      <Switch>
        <Route path={'/profile'}>
          <Link to={'/'} className={styles.navigate}>
            {'Navigate to root'}
          </Link>
        </Route>
        <Route path={'/'}>
          <Link to={'/profile'} className={styles.navigate}>
            {'Navigate to profile'}
          </Link>
        </Route>
      </Switch>
      <div className={styles.widget}>{headerWidget}</div>
    </div>
  );
}
