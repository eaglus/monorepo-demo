import * as React from 'react';

import styles from './styles.css';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  return <input {...props} className={props.className || styles.common} />;
}
