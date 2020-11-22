export interface Api {
  call<Result>(method: string, args: unknown[]): Promise<Result>;
}

export interface ApiDeps {
  api: Api;
}
