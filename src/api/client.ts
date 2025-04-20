import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { ApiResponse, ErrorResponse } from '@/types';

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${BOOKS_API_ENDPOINT}${endpoint}`;
  const response = await fetch(url, { ...options });

  if (!response.ok) {
    throw new Error(await generateErrorMessage(endpoint, response));
  }

  return await parseApiResponse<T>(response);
};

export const parseApiResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? await response.json()
    : ((await response.text()) as unknown as T);
  return {
    data,
    status: response.status,
    ok: response.ok,
  };
};

export const generateErrorMessage = async (
  endpoint: string,
  response: Response
) => {
  let errorMessage = `[URL] ${endpoint}`;
  try {
    const errorResponse = (await response.json()) as ErrorResponse;
    errorMessage += ` [MESSAGE] ${errorResponse.message} [STATUS] ${response.status}(${errorResponse.status})`;
  } catch {
    // JSON でない場合は無視
  }
  return errorMessage;
};

export const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error('不明なエラーが発生しました');
};
