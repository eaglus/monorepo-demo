export interface Logger {
  log(category: string, ...args: unknown[]): void;
}

export interface LoggerDeps {
  logger: Logger;
}
