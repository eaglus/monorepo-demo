import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';

import { assert, matchI } from '@tsp-wl/utils';
import { useDispatch } from '@tsp-wl/utils';
import { selectAuth, AuthStatus } from '@tsp-wl/auth';
//import { load } from '@tsp-wl/profile';
import { selectProfile, ProfileStatus, profileActions } from '@tsp-wl/profile';
import { treeShakingTest21, treeShakingTest31 } from '@tsp-wl/utils';

import styles from './styles.css';

const ProfileView: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  assert(auth._type === AuthStatus.Authorized);

  useEffect(() => {
    treeShakingTest21();
    treeShakingTest31();
    dispatch(profileActions.load.started());
  }, [dispatch, auth]);

  const content = matchI(profile)({
    [ProfileStatus.Empty]: () => <></>,
    [ProfileStatus.InProgress]: () => <span>Wait for profile loading...</span>,
    [ProfileStatus.Error]: error => <span>Error: {error.message}</span>,
    [ProfileStatus.Loaded]: profile => (
      <div className={styles.content}>
        <label>Login:</label>
        <span>{profile.userId}</span>
        <label>Name:</label>
        <span>{profile.name}</span>
        <label>Email:</label>
        <span>{profile.email}</span>
      </div>
    )
  });

  return <div className={styles.root}>{content}</div>;
};

export default ProfileView;
