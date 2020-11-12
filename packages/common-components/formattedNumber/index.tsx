import { formatNumber } from '@tsp-wl/utils';

import styles from './styles.css';

interface Props {
    value?: number;
}

export function FormattedNumber(props: Props) {
    return props.value !== undefined ? <span>{formatNumber(props.value)}</span> : <span>--</span>;
}
