export interface PageResponse<T> {
  count: number;
  current_page: number;
  next?: string;
  previous?: string;
  results: T[];
}

export type ApiResult<T, E> = [T | undefined, E | undefined];

export interface BaseApiError {
  error_code: string;
  error_message: string;
}

export interface GenericError {
  type: string;
  message: string;
}
