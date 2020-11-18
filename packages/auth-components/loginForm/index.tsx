import { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { object as objectT, string as stringT } from 'yup';

import { signIn } from '@tsp-wl/auth';
import { Button, Input } from '@tsp-wl/common-components';
import { useDispatch, useSchemaValidation } from '@tsp-wl/utils';

import styles from './styles.css';

type FormValues = {
  login: string;
  password: string;
};

const schema = objectT({
  login: stringT()
    .required('Login is required')
    .min(4, 'Login minimum size is 4 symbols'),

  password: stringT()
    .required('Password is required')
    .min(6, 'Password minimum size is 6 symbols')
});

export function LoginForm() {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values: FormValues) => dispatch(signIn(values.login, values.password)),
    [dispatch]
  );

  const validation = useSchemaValidation(schema);

  return (
    <Form onSubmit={onSubmit} validate={validation} validateOnBlur={true}>
      {formProps => (
        <form onSubmit={formProps.handleSubmit} className={styles.root}>
          <Field name={'login'}>
            {props => (
              <>
                <label htmlFor={'login'}>{'Login'}</label>
                <Input
                  name={'login'}
                  onChange={props.input.onChange}
                  onBlur={props.input.onBlur}
                  value={props.input.value}
                  type={'input'}
                  disabled={formProps.submitting}
                />
                {props.meta.touched && (
                  <span className={styles['error-message']}>
                    {props.meta.error}
                  </span>
                )}
              </>
            )}
          </Field>
          <Field name={'password'}>
            {props => (
              <>
                <label htmlFor={'password'}>{'Password'}</label>
                <Input
                  name={'password'}
                  onChange={props.input.onChange}
                  onBlur={props.input.onBlur}
                  value={props.input.value}
                  type={'password'}
                  disabled={formProps.submitting}
                />
                {props.meta.touched && (
                  <span className={styles['error-message']}>
                    {props.meta.error}
                  </span>
                )}
              </>
            )}
          </Field>
          <Button
            disabled={formProps.submitting}
            className={styles['submit-button']}
          >
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
}
