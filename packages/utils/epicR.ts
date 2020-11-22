import { Observable } from 'rxjs';
import { AnyAction } from 'typescript-fsa';

export type EpicR<Input extends AnyAction, State, Deps> = 
  (action$: Observable<Input>, state$: Observable<State>) => (deps: Deps) => Observable<Input>;
