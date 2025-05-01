import { BOOKS_API_BASE_URL } from '@/constants/constants';
import { ApiResponse, ErrorResponse } from '@/types';

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${BOOKS_API_BASE_URL}${endpoint}`;
  const response = await fetch(url, { ...options });

  if (!response.ok) {
    throw new Error(await generateErrorMessage(url, response));
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
    statusText: response.statusText,
  };
};

export const generateErrorMessage = async (url: string, response: Response) => {
  let errorMessage = `[URL] ${url}`;
  try {
    const errorResponse = (await response.json()) as ErrorResponse;
    errorMessage += ` [MESSAGE] ${errorResponse.message} [STATUS] ${response.status}(${errorResponse.status})`;
  } catch {
    // JSON でない場合は無視
  }
  return errorMessage;
};
