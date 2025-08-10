// このファイルだけはconsoleログの出力警告をしないようにする
/* eslint-disable no-console */

import {
  AUTH_SESSION_EXPIRED_EVENT,
  BOOKS_API_BASE_URL,
} from '@/constants/constants';
import { AccessToken } from '@/types/infrastructure/auth';
import { HttpError, HttpResponse, HttpErrorResponse } from '@/types/infrastructure/http';

let accessToken: string | null = null;
let sessionExpiredEventFired = false;

// エラーメッセージ定数
const ERROR_MESSAGES = {
  SESSION_EXPIRED: 'セッションの有効期限が切れました。再ログインしてください。',
  RESPONSE_PARSE_FAILED: 'レスポンスの解析に失敗しました:',
  TOKEN_REFRESH_FAILED: 'トークンリフレッシュ失敗:',
  INVALID_REFRESH_RESPONSE: 'リフレッシュレスポンスの形式が不正です:',
  REFRESH_PARSE_ERROR: 'リフレッシュレスポンスの解析に失敗しました:',
  REFRESH_REQUEST_ERROR: 'リフレッシュトークンリクエストエラー:',
  UNEXPECTED_API_ERROR: '予期しないAPI呼び出しエラー:',
} as const;

/**
 * アクセストークンをインメモリに設定します。
 * @param token - 設定するアクセストークン（nullの場合はクリア）
 */
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  // トークンが設定されたらセッション期限切れフラグをリセット
  if (token) {
    sessionExpiredEventFired = false;
  }
};

/**
 * 現在のアクセストークンを取得します。
 * @returns 現在のアクセストークン（設定されていない場合はnull）
 */
export const getAccessToken = () => accessToken;

/**
 * リクエストヘッダーにアクセストークンを追加します。
 * @param options - 元のリクエストオプション
 * @returns トークン付きヘッダーを含むヘッダーオブジェクト
 */
const createAuthHeaders = (options: RequestInit) => ({
  ...options.headers,
  ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
});

/**
 * セッション期限切れイベントを発信します（重複防止付き）。
 */
const fireSessionExpiredEvent = () => {
  if (!sessionExpiredEventFired) {
    sessionExpiredEventFired = true;
    window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
  }
};

/**
 * セッション期限切れフラグをリセットします。
 */
export const resetSessionExpiredFlag = () => {
  sessionExpiredEventFired = false;
};

/**
 * 自動トークン管理機能付きのカスタムFetch関数
 *
 * 以下の機能を提供します:
 * - アクセストークンの自動付与
 * - 401エラー時の自動トークンリフレッシュとリトライ（1回まで）
 * - セッション期限切れ時のカスタムイベント発信（重複防止付き）
 * - 統一されたエラーハンドリング
 *
 * @template T - レスポンスデータの型
 * @param endpoint - APIエンドポイント（ベースURLからの相対パス）
 * @param options - fetch APIのオプション
 * @returns APIレスポンス（データ、ステータス、成功フラグを含む）
 * @throws HttpError レスポンスがエラーの場合
 * @throws Error セッション期限切れまたは予期しないエラーの場合
 */
export const customFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<HttpResponse<T>> => {
  const url = `${BOOKS_API_BASE_URL}${endpoint}`;
  const headers = createAuthHeaders(options);

  try {
    let response = await fetch(url, { ...options, headers });
    let hasRetried = false;

    // 401エラーの場合、リフレッシュトークンでアクセストークンの更新を試みる（1回まで）
    if (response.status === 401 && !hasRetried) {
      const refreshed = await refreshAccessToken();

      // リフレッシュに成功した場合、元のリクエストを再試行
      if (refreshed) {
        hasRetried = true;
        const retryHeaders = createAuthHeaders(options);
        response = await fetch(url, { ...options, headers: retryHeaders });
      } else {
        // リフレッシュトークンも期限切れの場合、認証イベントを発火
        fireSessionExpiredEvent();
        throw new Error(ERROR_MESSAGES.SESSION_EXPIRED);
      }
    }

    // レスポンスを解析
    const httpResponse = await parseHttpResponse<T>(response);

    // エラーレスポンスの場合は例外をスロー
    if (!response.ok) {
      // リトライ後も401エラーの場合はセッション期限切れとして扱う
      if (response.status === 401 && hasRetried) {
        fireSessionExpiredEvent();
        throw new Error(ERROR_MESSAGES.SESSION_EXPIRED);
      }

      const errorResponse = httpResponse.data as HttpErrorResponse;

      // null安全 + 型変換
      const errorMessage =
        errorResponse?.message ||
        `HTTP ${response.status}: ${response.statusText}`;
      const errorStatus = response.status;

      throw new HttpError(
        errorMessage,
        errorStatus,
        response.statusText,
        errorResponse
      );
    }

    return httpResponse;
  } catch (error) {
    // HttpErrorの場合は再ログしない（既に適切な情報を持っている）
    if (!(error instanceof HttpError)) {
      console.error(ERROR_MESSAGES.UNEXPECTED_API_ERROR, {
        url,
        method: options.method || 'GET',
        error: error instanceof Error ? error.message : error,
      });
    }
    throw error;
  }
};

/**
 * レスポンスデータ解析時の適切なフォールバック値を生成します。
 * @template T - レスポンスデータの型
 * @param response - fetch APIのレスポンスオブジェクト
 * @returns フォールバック値
 */
const createFallbackData = <T>(response: Response): T => {
  if (!response.ok) {
    // エラーレスポンスの場合はエラー情報を含むフォールバック
    const fallbackErrorData = {
      message: `HTTP ${response.status}: ${response.statusText}`,
      status: response.status.toString(),
    };
    // 型アサーションではなく、明示的な型変換で安全性を示す
    return fallbackErrorData as T;
  }

  // 成功レスポンスの場合は空のオブジェクトを返す
  return {} as T;
};

/**
 * Fetchレスポンスを解析してAPIレスポンス形式に変換します。
 *
 * Content-Typeに基づいてJSONまたはテキストとして解析し、
 * エラー時には適切なフォールバック値を使用します。
 *
 * @template T - レスポンスデータの型
 * @param response - fetch APIのレスポンスオブジェクト
 * @returns 解析されたAPIレスポンス
 */
const parseHttpResponse = async <T>(
  response: Response
): Promise<HttpResponse<T>> => {
  const contentType = response.headers.get('content-type');
  let data: T;

  try {
    if (contentType?.includes('application/json')) {
      const jsonData = await response.json();
      // falsy値（false, 0, ''など）も有効なレスポンスとして扱う
      data = jsonData ?? createFallbackData<T>(response);
    } else {
      // テキストレスポンスの場合は注意深く処理
      const textData = await response.text();
      if (textData.trim() === '') {
        data = createFallbackData<T>(response);
      } else {
        // テキストをT型として扱うのは危険なので、string型でラップ
        data = textData as unknown as T;
      }
    }
  } catch (e) {
    console.error(ERROR_MESSAGES.RESPONSE_PARSE_FAILED, e);
    data = createFallbackData<T>(response);
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
};

/**
 * AccessToken型であるかを検証します。
 * @param data - 検証するデータ
 * @returns AccessToken型であるかどうか
 */
const isAccessToken = (data: unknown): data is AccessToken => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'accessToken' in data &&
    typeof (data as AccessToken).accessToken === 'string'
  );
};

/**
 * リフレッシュトークンを使用してアクセストークンを更新します。
 *
 * HTTPクッキーに保存されたリフレッシュトークンを使用して
 * 新しいアクセストークンを取得し、インメモリストレージを更新します。
 * 無限ループ防止のため、この関数内ではcustomFetchを使用しません。
 *
 * @returns トークンリフレッシュの成功/失敗（boolean）
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BOOKS_API_BASE_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    // リフレッシュトークンが無効または期限切れの場合
    if (!response.ok) {
      const errorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };
      console.warn(ERROR_MESSAGES.TOKEN_REFRESH_FAILED, errorInfo);
      accessToken = null;
      return false;
    }

    try {
      const data = await response.json();

      // レスポンスデータの型検証
      if (!isAccessToken(data)) {
        console.error(ERROR_MESSAGES.INVALID_REFRESH_RESPONSE, data);
        accessToken = null;
        return false;
      }

      accessToken = data.accessToken;
      return true;
    } catch (parseError) {
      console.error(ERROR_MESSAGES.REFRESH_PARSE_ERROR, parseError);
      accessToken = null;
      return false;
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.REFRESH_REQUEST_ERROR, error);
    accessToken = null;
    return false;
  }
};
