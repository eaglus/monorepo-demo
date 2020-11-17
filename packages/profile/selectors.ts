import { StoreSegment, storePart } from './types';

export function selectProfile(segment: StoreSegment) {
  return segment[storePart];
}
