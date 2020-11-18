import { formatNumber } from '@tsp-wl/utils';

import styles from './styles.css';

interface Props {
  value?: number;
  className?: string;
}

export function FormattedNumber(props: Props) {
  return props.value !== undefined ? (
    <span className={props.className || styles.common}>
      {formatNumber(props.value)}
    </span>
  ) : (
    <span className={props.className || styles.common}>--</span>
  );
}
