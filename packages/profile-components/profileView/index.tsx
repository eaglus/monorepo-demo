import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';

import { assert, matchI } from '@tsp-wl/utils';
import { useDispatch } from '@tsp-wl/utils';
import { selectAuth, AuthorizationState } from '@tsp-wl/auth';
//import { load } from '@tsp-wl/profile';
import { selectProfile, ProfileState, profileActions } from '@tsp-wl/profile';
import { treeShakingTest21, treeShakingTest31 } from '@tsp-wl/utils';

import styles from './styles.css';

const ProfileView: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  assert(auth._type === AuthorizationState.Authorized);

  useEffect(() => {
    treeShakingTest21();
    treeShakingTest31();
    dispatch(profileActions.load.started());
  }, [dispatch, auth]);

  const content = matchI(profile)({
    [ProfileState.Empty]: () => <></>,
    [ProfileState.InProgress]: () => <span>Wait for profile loading...</span>,
    [ProfileState.Error]: error => <span>Error: {error.message}</span>,
    [ProfileState.Loaded]: profile => (
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
