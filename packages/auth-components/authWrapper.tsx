import React, { createContext, useMemo, useCallback, FC } from 'react';
import { useSelector } from 'react-redux';

import { selectAuth, AuthorizationState, signOut } from '@tsp-wl/auth';
import { matchI, useDispatch } from '@tsp-wl/utils';

import { LoginForm } from './loginForm';

type ContentWrapper = (content: JSX.Element) => JSX.Element;
interface AuthWrapperContextType {
  headerWidget: JSX.Element;
  contentWrapper: (requireAuthorization: boolean) => ContentWrapper;
}

export const authWrapperContext = createContext<AuthWrapperContextType>({
  headerWidget: <></>,
  contentWrapper: () => () => <></>
});

const { Provider } = authWrapperContext;

export const AuthWrapper: FC<{}> = props => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onLogoutClick = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const headerWidget = useMemo(() => {
    const login = () => <a href={'#'}>Login</a>;
    const logout = () => (
      <a onClick={onLogoutClick} href={'#'}>
        Logout
      </a>
    );
    return matchI(auth)<JSX.Element>({
      [AuthorizationState.Unauthorized]: login,
      [AuthorizationState.Error]: login,
      [AuthorizationState.Authorized]: logout,
      [AuthorizationState.InProgress]: () => <span>Wait...</span>
    });
  }, [auth, onLogoutClick]);

  const contentWrapper = useMemo<AuthWrapperContextType['contentWrapper']>(
    () => requireAuthorization => {
      const withLoginForm = (): ContentWrapper => content =>
        requireAuthorization ? <LoginForm /> : content;

      return matchI(auth)<ContentWrapper>({
        [AuthorizationState.Unauthorized]: withLoginForm,
        [AuthorizationState.Error]: withLoginForm,
        [AuthorizationState.Authorized]: () => content => content,
        [AuthorizationState.InProgress]: () => () => (
          <div>Wait for authorzation...</div>
        )
      });
    },
    [auth]
  );

  const context = useMemo(
    () => ({
      headerWidget,
      contentWrapper
    }),
    [headerWidget, contentWrapper]
  );

  return <Provider value={context}>{props.children}</Provider>;
};
