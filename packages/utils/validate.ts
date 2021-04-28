import { useCallback } from 'react';

import { ValidationErrors } from 'final-form';
import { BaseSchema, ValidationError } from 'yup';

function formatErrors(
  result: Record<string, string>,
  error: ValidationError,
  namePrefix = ''
): ValidationErrors {
  if (error.inner?.length) {
    return error.inner.reduce(
      (res, innerError) =>
        formatErrors(res, innerError, error.path ? error.path + '.' : '') || {},
      result
    );
  } else {
    return {
      ...result,
      [namePrefix + error.path]: error.message
    };
  }
}

export function useSchemaValidation(schema: BaseSchema<unknown>) {
  return useCallback(
    (value: Record<string, unknown>) => {
      try {
        schema.validateSync(value, {
          abortEarly: false
        });
        return undefined;
      } catch (e) {
        const error: ValidationError = e;
        return formatErrors({}, error);
      }
    },
    [schema]
  );
}
