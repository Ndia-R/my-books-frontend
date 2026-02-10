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
 * 現在のページが試し読みの最後のページかを判定する。
 * true の場合、ペイウォール表示が必要。
 */
export const isLastPreviewPage = (
  setting: { maxChapter: number; maxPage: number },
  page: {
    chapterNumber: number;
    pageNumber: number;
    totalPagesInChapter: number;
  }
): boolean => {
  const { maxChapter, maxPage } = setting;
  const { chapterNumber, pageNumber, totalPagesInChapter } = page;

  // 全章無制限 → ペイウォール不要
  if (maxChapter === -1) return false;

  // まだ最大章に達していない → ペイウォールではない
  if (chapterNumber < maxChapter) return false;

  // 最大章にいる場合
  if (chapterNumber === maxChapter) {
    if (maxPage === -1) {
      // その章の全ページが試し読み対象 → 章の最終ページがペイウォール
      return pageNumber === totalPagesInChapter;
    }
    // ページ制限あり → そのページがペイウォール
    return pageNumber === maxPage;
  }

  // maxChapter を超えている（通常はバックエンドの403で到達しない）
  return true;
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
