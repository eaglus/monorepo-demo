import { useContext } from 'react';

import { authWrapperContext } from '@tsp-wl/auth-components';

import styles from './styles.css';

interface Props {
  title: string;
}

export function Header(props: Props) {
  const { headerWidget } = useContext(authWrapperContext);
  return (
    <div className={styles.common}>
      <div className={styles.title}>{props.title}</div>
      <div>{headerWidget}</div>
    </div>
  );
}
