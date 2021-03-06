import React, {
  createContext,
  useMemo,
  useCallback,
  FC,
  ReactNode
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import {
  selectAuth,
  AuthorizationState,
  State as Auth,
  signOut
} from '@tsp-wl/auth';
import { ADTMember, matchI, useDispatch } from '@tsp-wl/utils';

import { LoginForm } from './loginForm';

type ContentWrapper = (content: ReactNode) => ReactNode;
interface AuthWrapperContextType {
  headerWidget: ReactNode;
  getContentWrapper: (requireAuthorization: boolean) => ContentWrapper;
}

export const authWrapperContext = createContext<AuthWrapperContextType>({
  headerWidget: <></>,
  getContentWrapper: () => () => <></>
});

const { Provider } = authWrapperContext;

export const AuthWrapper: FC<{}> = props => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      await dispatch(signOut());
      history.push('/');
    },
    [dispatch, history]
  );

  const headerWidget = useMemo(() => {
    const login = () => <Link to={'/login'}>Login</Link>;
    const logout = (data: ADTMember<Auth, AuthorizationState.Authorized>) => (
      <span>
        <span>{data.userId}</span>
        &nbsp;
        <a onClick={onLogoutClick} href={'#'}>
          Logout
        </a>
      </span>
    );
    return matchI(auth)<ReactNode>({
      [AuthorizationState.Unauthorized]: login,
      [AuthorizationState.Error]: login,
      [AuthorizationState.Authorized]: logout,
      [AuthorizationState.InProgress]: () => <span>Wait...</span>
    });
  }, [auth, onLogoutClick]);

  const getContentWrapper = useMemo<
    AuthWrapperContextType['getContentWrapper']
  >(
    () => requireAuthorization => {
      const withLoginForm = (): ContentWrapper => content =>
        requireAuthorization ? <LoginForm /> : content;

      return matchI(auth)<ContentWrapper>({
        [AuthorizationState.Unauthorized]: withLoginForm,
        [AuthorizationState.Error]: withLoginForm,
        [AuthorizationState.Authorized]: () => content => content,
        [AuthorizationState.InProgress]: () => () => (
          <div>Wait for login/logout...</div>
        )
      });
    },
    [auth]
  );

  const context = useMemo(
    () => ({
      headerWidget,
      getContentWrapper
    }),
    [headerWidget, getContentWrapper]
  );

  return <Provider value={context}>{props.children}</Provider>;
};
