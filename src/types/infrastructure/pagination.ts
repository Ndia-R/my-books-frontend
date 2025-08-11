/**
 * 汎用的なページング型
 * @template T ページングされるデータの型
 */
export type Page<T> = {
  currentPage: number; // ページ番号は1ベース
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: T[];
};