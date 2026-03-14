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
