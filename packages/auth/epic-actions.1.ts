// import { AnyAction } from 'typescript-fsa';
// import { from, Observable } from 'rxjs';
// import { pipe } from "fp-ts/lib/pipeable";
// import { readerObservable as RO } from 'fp-ts-rxjs';
// import { ReaderObservable } from 'fp-ts-rxjs/lib/ReaderObservable';
//
// import { ApiDeps } from '@tsp-wl/api';
// import { EpicR } from '@tsp-wl/utils';
//
// import { actions, StoreSegment } from './types';
//
// interface LoginResut {
//   accessToken: string;
//   refreshToken: string;
//   userId: string;
// }
//
// const doSignIn = (login: string, logout: string): ReaderObservable<ApiDeps, LoginResut> => deps => from(
//   deps.api.call<LoginResut>('sign-in', [login, logout])
// );
//
// const doSignOut = (): ReaderObservable<ApiDeps, void> => deps => from(
//   deps.api.call<void>('sign-out', [])
// );
//
// const signOutAndSighIn = (state$: Observable<StoreSegment>, login: string, password: string) => pipe(
//   doSignOut(),
//   RO.chain(() => doSignIn(login, password))
// );
//
// export const authEpicR: EpicR<AnyAction, AnyAction, StoreSegment> = (actions$, state$) => deps => {
//   return actions$;
// };
//
