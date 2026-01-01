import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * sleep関数
 * @param msec ミリ秒
 *
 * await sleep(3000);  // ３秒待つ
 */
export const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy年M月d日の文字列
 */
export const formatDateJP = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy/MM/dd日の文字列
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\./g, '/'); // '.'区切りを '/' に変換
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns H:mmの文字列
 */
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * 相対時刻表示（○分前、○時間前など）に変換
 * 7日以内: 相対時刻（例: "3分前"、"2時間前"、"昨日"）
 * 7日より前: 絶対時刻（例: "2024年12月1日"）
 * @param dateString yyyy-MM-ddTHH:mm:ss形式の文字列
 * @returns 相対時刻または絶対時刻の文字列
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('ja', { numeric: 'auto' });

  // 7日以内: 相対時刻
  if (diffSeconds < 60) return 'たった今';
  if (diffMinutes < 60) return rtf.format(-diffMinutes, 'minute');
  if (diffHours < 24) return rtf.format(-diffHours, 'hour');
  if (diffDays < 7) return rtf.format(-diffDays, 'day');

  // 7日より前: 絶対時刻
  return formatDateJP(dateString);
};

/**
 * 価格をカンマ区切り数字文字列へ変換
 * @param price 価格
 * @returns カンマ区切り数字文字列
 */
export const formatPrice = (price: number) => {
  return price === 0 ? '-' : `${Number(price).toLocaleString()}円`;
};

/**
 * ISBNの文字列をハイフンを含めたISBN文字列へ変換
 * @param isbn isbn文字列
 * @returns ハイフンを含めたISBN文字列
 */
export const formatIsbn = (isbnString: string) => {
  const country = isbnString.slice(0, 3);
  const area = isbnString.slice(3, 4);
  const publisher = isbnString.slice(4, 7);
  const book = isbnString.slice(7, 12);
  const check = isbnString.slice(12, 13);

  return country + '-' + area + '-' + publisher + '-' + book + '-' + check;
};

/**
 * 章番号文字列を返す
 * @param num 章番号
 * @returns 章番号を含めた文字列
 */
export const chapterNumberString = (num: number) => {
  return `第${num}章`;
};

/**
 * CookieからCSRFトークンを取得する
 * @returns CSRFトークン文字列（取得できない場合は空文字列）
 */
export const getCsrfToken = (): string => {
  try {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
  } catch (error) {
    console.error('CSRFトークンの取得に失敗:', error);
    return '';
  }
};

/**
 * クエリパラメータオブジェクトからURLクエリ文字列を生成
 *
 * @param params - クエリパラメータのオブジェクト
 * @returns URLエンコードされたクエリ文字列（?付き、パラメータがない場合は空文字列）
 *
 * @example
 * buildQueryString({ q: '本', page: 1, size: 20 })
 * // => '?q=%E6%9C%AC&page=1&size=20'
 *
 * buildQueryString({ name: undefined, age: null })
 * // => ''
 */
export const buildQueryString = (
  params: Record<string, string | number | boolean | undefined | null>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // undefined、null、空文字列は除外
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * パスパラメータを安全にエンコードしてURLパスを構築
 *
 * @param template - パステンプレート（例: '/books/:id/chapters/:chapter'）
 * @param params - パラメータオブジェクト
 * @returns エンコードされたパス
 *
 * @example
 * buildPath('/books/:bookId', { bookId: '123' })
 * // => '/books/123'
 *
 * buildPath('/books/:id/chapters/:num', { id: 'book#1', num: 2 })
 * // => '/books/book%231/chapters/2'
 *
 * @throws {Error} テンプレート内のパラメータがparamsに存在しない場合
 */
export const buildPath = (
  template: string,
  params: Record<string, string | number>
): string => {
  let path = template;
  const usedParams = new Set<string>();

  // :paramName形式のパラメータを置き換え
  path = path.replace(/:(\w+)/g, (_match, paramName) => {
    if (!(paramName in params)) {
      throw new Error(
        `パラメータ '${paramName}' がパステンプレート '${template}' に必要ですが、提供されていません`
      );
    }
    usedParams.add(paramName);
    return encodeURIComponent(params[paramName].toString());
  });

  // 未使用のパラメータがあれば警告（開発時のみ）
  if (import.meta.env.DEV) {
    const unusedParams = Object.keys(params).filter(
      (key) => !usedParams.has(key)
    );
    if (unusedParams.length > 0) {
      console.warn(
        `buildPath: 未使用のパラメータがあります: ${unusedParams.join(', ')}`
      );
    }
  }

  return path;
};
