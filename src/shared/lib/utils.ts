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
