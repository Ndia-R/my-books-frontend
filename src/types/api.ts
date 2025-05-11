export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  ok: boolean;
};

export type ErrorResponse = {
  message: string;
  status: string;
};
