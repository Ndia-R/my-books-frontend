import { BOOKS_API_BASE_URL } from '@/constants/constants';
import { getAccessToken, setAccessToken } from '@/lib/api/fetch-api/auth-token';
import { AccessToken, ApiResponse, ErrorResponse } from '@/types';

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${BOOKS_API_BASE_URL}${endpoint}`;

  // アクセストークンがある場合はヘッダーに追加
  const accessToken = getAccessToken();
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(url, { ...options, headers });

  // アクセストークンを指定したリクエストが認証エラー
  // （アクセストークンの有効期限切れなど）の場合は
  // リフレッシュトークンを使ってアクセストークンを再取得する
  if (accessToken && response.status === 401) {
    try {
      const newAccessToken = await refreshToken();
      setAccessToken(newAccessToken);

      const newHeaders = new Headers(options.headers);
      newHeaders.set('Authorization', `Bearer ${newAccessToken}`);

      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      console.error('ログインセッションの期限が切れました。', error);
      setAccessToken(null);
      throw error;
    }
  }

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

export const refreshToken = async () => {
  try {
    const url = `${BOOKS_API_BASE_URL}/refresh-token`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`トークンリフレッシュ失敗: ${response.status}`);
    }

    const data = (await response.json()) as AccessToken;
    return data.accessToken;
  } catch (error) {
    console.error('リフレッシュトークンエラー:', error);
    // 元のエラー情報を保持しつつ再スロー
    throw error;
  }
};
