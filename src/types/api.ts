export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  ok: boolean;
}

export interface ErrorResponse {
  message: string;
  status: string;
}
