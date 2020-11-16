import { StoreSegment, storePart } from './types';

export function selectAuth(segment: StoreSegment) {
  return segment[storePart];
}
