import { useEffect, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch, assert, matchI } from '@tsp-wl/utils';
import { selectAuth, AuthorizationState } from '@tsp-wl/auth';
import { selectProfile, load, ProfileState } from '@tsp-wl/profile';

import styles from './styles.css';

const ProfileEdit: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  assert(auth._type === AuthorizationState.Authorized);

  useEffect(() => {
    dispatch(load());
  }, [dispatch, auth]);

  const onChange = useCallback(() => {
    console.log('Profile editing is not implemented');
  }, []);

  const content = matchI(profile)({
    [ProfileState.Empty]: () => <></>,
    [ProfileState.InProgress]: () => <span>Wait for profile loading...</span>,
    [ProfileState.Error]: error => <span>Error: {error.message}</span>,
    [ProfileState.Loaded]: profile => (
      <form className={styles.content}>
        <label>Login:</label>
        <span>{profile.userId}</span>
        <label>Name:</label>
        <input name="name" value={profile.name} onChange={onChange} />
        <label>Email:</label>
        <input name="email" value={profile.email} onChange={onChange} />
      </form>
    )
  });

  return <div className={styles.root}>{content}</div>;
};

export default ProfileEdit;
