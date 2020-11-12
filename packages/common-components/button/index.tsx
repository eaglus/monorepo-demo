import * as React from "react";

import styles from './styles.css';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
    return <button {...props} className={styles.common} />
}
