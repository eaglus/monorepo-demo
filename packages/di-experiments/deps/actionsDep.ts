import { Observable } from 'rxjs';
import { ActionCreator, AnyAction } from 'typescript-fsa';

import * as R from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function';

import { ofActionPayload } from '@tsp-wl/utils/redux-utils';

import { mapObservable } from '../operators/pipeOperatorsR';

export interface ActionsDep {
  actions$: Observable<AnyAction>;
}

export const askActions = () =>
  pipe(
    R.ask<ActionsDep>(),
    R.map(deps => deps.actions$)
  );

export const ofActionPayloadR = <Payload>(
  actionCreator: ActionCreator<Payload>
) => pipe(askActions(), mapObservable(ofActionPayload(actionCreator)));
