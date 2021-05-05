import { createSelector } from 'reselect';
import { AuthStoreSegment, storePart, AuthData } from './types';

export function selectAuth(segment: AuthStoreSegment) {
  return segment[storePart];
}

export const selectAuthorizedData = createSelector(selectAuth, auth =>
  auth._type === 'Authorized' ? (auth as AuthData) : undefined
);
