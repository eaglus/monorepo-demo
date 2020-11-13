import { Button, FormattedNumber } from '@tsp-wl/common-components';

export function ClientRoot() {
  return (
    <div>
      <Button>
        <FormattedNumber value={5} />
      </Button>
    </div>
  );
}
