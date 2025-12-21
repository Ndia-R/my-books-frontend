// このファイルだけはconsoleログの出力警告をしないようにする
/* eslint-disable no-console */

import { BOOKS_API_BASE_URL } from '@/constants/constants';
import {
  HttpError,
  type HttpErrorResponse,
  type HttpResponse,
} from '@/types/infrastructure/http';

/**
 * 自動トークン管理機能付きのカスタムFetch関数
 *
 * 以下の機能を提供します:
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

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
    });

    // レスポンスを解析
    const httpResponse = await parseHttpResponse<T>(response);

    // エラーレスポンスの場合は例外をスロー
    if (!response.ok) {
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
    console.error('レスポンスの解析に失敗しました:', e);
    data = createFallbackData<T>(response);
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
};

// CSRFトークン取得ヘルパー関数
export function getCsrfToken(): string {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
}
