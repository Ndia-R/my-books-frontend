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
