export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ErrorResponse {
  message: string;
  status: string;
}
