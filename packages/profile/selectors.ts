import { ProfileFullStoreSegment, storePart } from './types';

export function selectProfile(segment: ProfileFullStoreSegment) {
  return segment[storePart];
}
