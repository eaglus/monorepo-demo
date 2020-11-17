import { FC, useContext } from 'react';

import { authWrapperContext } from '@tsp-wl/auth-components';

import { Header } from '../header';

import styles from './styles.css';

interface Props {
  title: string;
  requiresAuthorization: boolean;
}

export const Layout: FC<Props> = props => {
  const contentWrapper = useContext(authWrapperContext).getContentWrapper(
    props.requiresAuthorization
  );
  return (
    <div>
      <Header title={props.title} />
      <div className={styles.content}>{contentWrapper(props.children)}</div>
    </div>
  );
};
