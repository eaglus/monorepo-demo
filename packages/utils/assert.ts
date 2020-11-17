export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error('Assertion failed' + (message ? ': ' + message : ''));
  }
}

export function assertDefined<T>(
  value: T | undefined,
  message?: string
): asserts value is NonNullable<T> {
  if (value === undefined) {
    throw new Error('Assertion failed' + (message ? ': ' + message : ''));
  }
}
