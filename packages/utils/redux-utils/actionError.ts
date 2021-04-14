export interface ActionError {
  code?: number;
  message: string;
  description?: string;
  errors?: Record<string, string>;
}
