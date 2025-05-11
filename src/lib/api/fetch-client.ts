import {
  AUTH_SESSION_EXPIRED_EVENT,
  BOOKS_API_BASE_URL,
} from '@/constants/constants';
import { AccessToken, ApiResponse, ErrorResponse } from '@/types';

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const customFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${BOOKS_API_BASE_URL}${endpoint}`;

  // アクセストークンがある場合はヘッダーに追加
  const headers = {
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    let response = await fetch(url, { ...options, headers });

    // 401エラーの場合、リフレッシュトークンでアクセストークンの更新を試みる
    if (response.status === 401) {
      const refreshed = await refreshAccessToken();

      // リフレッシュに成功した場合、元のリクエストを再試行
      if (refreshed) {
        const newHeaders = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        response = await fetch(url, { ...options, headers: newHeaders });
      } else {
        // リフレッシュトークンも期限切れの場合、認証イベントを発火
        window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
        throw new Error(
          'セッションの有効期限が切れました。再ログインしてください。'
        );
      }
    }

    // レスポンスを解析
    const apiResponse = await parseApiResponse<T>(response);

    // エラーレスポンスの場合は例外をスロー
    if (!response.ok) {
      const errorResponse = apiResponse.data as ErrorResponse;
      throw {
        message: errorResponse.message,
        status: errorResponse.status,
      };
    }

    return apiResponse;
  } catch (error) {
    console.error('API呼び出し中にエラーが発生しました:', error);
    throw error;
  }
};

const parseApiResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  let data: T;

  try {
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }
  } catch (e) {
    console.error('レスポンスの解析に失敗しました:', e);
    data = {} as T;
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
};

export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${BOOKS_API_BASE_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    // リフレッシュトークンが無効または期限切れの場合
    if (!response.ok) {
      throw new Error(`トークンリフレッシュ失敗: ${response.status}`);
    }

    const data = (await response.json()) as AccessToken;
    accessToken = data.accessToken;
    return true;
  } catch (error) {
    console.error('リフレッシュトークンエラー:', error);
    accessToken = null;
    return false;
  }
};
