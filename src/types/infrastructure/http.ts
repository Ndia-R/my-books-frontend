export type HttpResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  ok: boolean;
};

export type HttpErrorResponse = {
  message: string;
  status: string;
};

// HTTPエラークラスの定義
export class HttpError extends Error {
  public status: number;
  public statusText?: string;
  public originalError?: HttpErrorResponse;

  constructor(
    message: string,
    status: number,
    statusText?: string,
    originalError?: HttpErrorResponse
  ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.originalError = originalError;
  }
}