import { useDispatch as useDispatch_ } from 'react-redux';

import { Dispatch } from './types';

export const useDispatch = () => useDispatch_<Dispatch>();
