import * as React from 'react';

import styles from './styles.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  return <button {...props} className={styles.common} />;
}
