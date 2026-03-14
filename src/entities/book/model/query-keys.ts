export const bookQueryKeys = {
  getBooksNewReleases: () => ['getBooksNewReleases'] as const,
  searchBooksByTitleKeyword: (q: string, page: number) =>
    ['searchBooksByTitleKeyword', q, page] as const,
  searchBooksByGenre: (genreIds: string, condition: string, page: number) =>
    ['searchBooksByGenre', genreIds, condition, page] as const,
  getBookDetails: (bookId: string) => ['getBookDetails', bookId] as const,
  getBookToc: (bookId: string) => ['getBookToc', bookId] as const,
  getBookChapterPagePreview: (
    bookId: string,
    chapterNumber: number,
    pageNumber: number
  ) =>
    ['getBookChapterPagePreview', bookId, chapterNumber, pageNumber] as const,
  getBookChapterPageContent: (
    bookId: string,
    chapterNumber: number,
    pageNumber: number
  ) =>
    ['getBookChapterPageContent', bookId, chapterNumber, pageNumber] as const,
  getBookReviewsInfinite: (bookId: string) =>
    ['getBookReviewsInfinite', bookId] as const,
  getBookFavoriteStats: (bookId: string) =>
    ['getBookFavoriteStats', bookId] as const,
  getBookPreviewSettingPublic: (bookId: string) =>
    ['getBookPreviewSettingPublic', bookId] as const,
} as const;
