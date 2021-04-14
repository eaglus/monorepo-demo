import { useEffect, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { assert, matchI } from '@tsp-wl/utils';
import { useDispatch } from '@tsp-wl/utils';
import { selectAuth, AuthorizationState } from '@tsp-wl/auth';
//import { load } from '@tsp-wl/profile';
import { selectProfile, ProfileState, profileActions } from '@tsp-wl/profile';
import { treeShakingTest11, treeShakingTest31 } from '@tsp-wl/utils';
import { epicR3, epicR2 } from '@tsp-wl/utils';

import styles from './styles.css';

const ProfileEdit: FC<{}> = () => {
  epicR3();
  epicR2();

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  assert(auth._type === AuthorizationState.Authorized);

  useEffect(() => {
    treeShakingTest11();
    treeShakingTest31();
    dispatch(profileActions.load.started());
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
