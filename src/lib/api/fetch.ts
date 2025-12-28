import { BFF_BASE_URL, BOOKS_API_BASE_URL } from '@/constants/constants';
import {
  HttpError,
  type HttpErrorResponse,
  type HttpResponse,
} from '@/types/infrastructure/http';

/**
 * 汎用HTTPクライアント関数
 *
 * 以下の機能を提供します:
 * - 統一されたエラーハンドリング
 * - 自動的なレスポンス解析（JSON/テキスト）
 * - 型安全なエラー処理
 *
 * @template T - レスポンスデータの型
 * @param url - リクエスト先の完全なURL
 * @param options - fetch APIのオプション
 * @returns APIレスポンス（データ、ステータス、成功フラグを含む）
 * @throws HttpError レスポンスがエラーの場合
 * @throws Error 予期しないエラーの場合
 */
export const httpFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<HttpResponse<T>> => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
    });

    // レスポンスを解析
    const httpResponse = await parseHttpResponse<T>(response);

    // エラーレスポンスの場合は例外をスロー
    if (!response.ok) {
      const errorResponse = isHttpErrorResponse(httpResponse.data)
        ? httpResponse.data
        : createFallbackErrorData(response);

      throw new HttpError(
        errorResponse.message,
        response.status,
        response.statusText,
        errorResponse
      );
    }

    return httpResponse;
  } catch (error) {
    // HttpErrorの場合は再ログしない（既に適切な情報を持っている）
    if (!(error instanceof HttpError)) {
      console.error('予期しないAPI呼び出しエラー:', {
        url,
        method: options.method || 'GET',
        error: error instanceof Error ? error.message : error,
      });
    }
    throw error;
  }
};

/**
 * Books API専用のFetch関数
 *
 * httpFetchのラッパー関数で、BOOKS_API_BASE_URLを自動的に付与します。
 *
 * @template T - レスポンスデータの型
 * @param endpoint - APIエンドポイント（ベースURLからの相対パス）
 * @param options - fetch APIのオプション
 * @returns APIレスポンス
 * @throws HttpError レスポンスがエラーの場合
 */
export const fetchBooksApi = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<HttpResponse<T>> => {
  return httpFetch<T>(`${BOOKS_API_BASE_URL}${endpoint}`, options);
};

/**
 * BFF API専用のFetch関数
 *
 * httpFetchのラッパー関数で、BFF_BASE_URLを自動的に付与します。
 * 認証関連のAPI（ログイン、ログアウト等）で使用します。
 *
 * @template T - レスポンスデータの型
 * @param endpoint - APIエンドポイント（ベースURLからの相対パス）
 * @param options - fetch APIのオプション
 * @returns APIレスポンス
 * @throws HttpError レスポンスがエラーの場合
 */
export const fetchBffApi = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<HttpResponse<T>> => {
  return httpFetch<T>(`${BFF_BASE_URL}${endpoint}`, options);
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

      // エラーレスポンスでnull/undefinedの場合のみフォールバック
      // 成功レスポンス(response.ok=true)ではnullも正常値として扱う
      if ((jsonData === null || jsonData === undefined) && !response.ok) {
        data = createFallbackErrorData(response) as T;
      } else {
        data = jsonData;
      }
    } else {
      // テキストレスポンスの場合
      const textData = await response.text();

      if (textData.trim() === '' && !response.ok) {
        // エラーレスポンスで空の場合のみフォールバック
        data = createFallbackErrorData(response) as T;
      } else {
        // テキストデータを型Tとして返す
        // 注意: 呼び出し側で型Tが文字列型であることを保証する必要がある
        data = textData as unknown as T;
      }
    }
  } catch (e) {
    console.error('レスポンスの解析に失敗しました:', e);
    data = createFallbackErrorData(response) as T;
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
};

/**
 * エラーレスポンス用のフォールバックデータを生成します。
 *
 * レスポンスボディが空または解析不能な場合に使用されます。
 *
 * @param response - fetch APIのレスポンスオブジェクト
 * @returns フォールバックエラーデータ
 */
const createFallbackErrorData = (
  response: Response
): HttpErrorResponse => {
  return {
    message: `HTTP ${response.status}: ${response.statusText}`,
    status: response.status.toString(),
  };
};

/**
 * HttpErrorResponse型のデータかどうかを判定する型ガード関数
 * @param data - チェック対象のデータ
 * @returns HttpErrorResponse型の場合true
 */
const isHttpErrorResponse = (data: unknown): data is HttpErrorResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as Record<string, unknown>).message === 'string'
  );
};
