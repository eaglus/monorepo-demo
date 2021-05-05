import { useEffect, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { assert, matchI } from '@tsp-wl/utils';
import { useDispatch } from '@tsp-wl/utils';
import { selectAuth, AuthStatus } from '@tsp-wl/auth';
//import { load } from '@tsp-wl/profile';
import { selectProfile, ProfileStatus, profileActions } from '@tsp-wl/profile';
import { treeShakingTestL0_11, treeShakingTestL0_31 } from '@tsp-wl/utils';
import { treeShakingTestL2_3, treeShakingTestL2_2 } from '@tsp-wl/utils';

import styles from './styles.css';

const ProfileEdit: FC<{}> = () => {
  treeShakingTestL2_3();
  treeShakingTestL2_2();

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  assert(auth._type === AuthStatus.Authorized);

  useEffect(() => {
    treeShakingTestL0_11();
    treeShakingTestL0_31();
    dispatch(profileActions.load.started());
  }, [dispatch, auth]);

  const onChange = useCallback(() => {
    console.log('Profile editing is not implemented');
  }, []);

  const content = matchI(profile)({
    [ProfileStatus.Empty]: () => <></>,
    [ProfileStatus.InProgress]: () => <span>Wait for profile loading...</span>,
    [ProfileStatus.Error]: error => <span>Error: {error.message}</span>,
    [ProfileStatus.Loaded]: profile => (
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
