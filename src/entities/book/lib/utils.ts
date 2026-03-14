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
