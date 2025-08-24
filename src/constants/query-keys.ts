export const queryKeys = {
  // Books API
  getBooksNewReleases: () => ['getBooksNewReleases'] as const,
  searchBooksByTitleKeyword: (q: string, page: number) =>
    ['searchBooksByTitleKeyword', q, page] as const,
  searchBooksByGenre: (genreIds: string, condition: string, page: number) =>
    ['searchBooksByGenre', genreIds, condition, page] as const,
  getBookDetails: (bookId: string) => ['getBookDetails', bookId] as const,
  getBookToc: (bookId: string) => ['getBookToc', bookId] as const,
  getBookChapterPageContent: (
    bookId: string,
    chapterNumber: number,
    pageNumber: number
  ) =>
    ['getBookChapterPageContent', bookId, chapterNumber, pageNumber] as const,
  getBookReviews: (bookId: string, page: number) =>
    ['getBookReviews', bookId, page] as const,
  getBookReviewStats: (bookId: string) =>
    ['getBookReviewStats', bookId] as const,
  getBookFavoriteStats: (bookId: string) =>
    ['getBookFavoriteStats', bookId] as const,

  // Genres API
  getGenres: () => ['getGenres'] as const,

  // User API
  getUserProfile: () => ['getUserProfile'] as const,
  getUserProfileCounts: () => ['getUserProfileCounts'] as const,
  getUserReviews: (page: number) => ['getUserReviews', page] as const,
  getUserFavorites: (page: number) => ['getUserFavorites', page] as const,
  getUserBookmarks: (page: number) => ['getUserBookmarks', page] as const,
  getUserReviewsByBookId: (bookId: string) =>
    ['getUserReviewsByBookId', bookId] as const,
  getUserFavoritesByBookId: (bookId: string) =>
    ['getUserFavoritesByBookId', bookId] as const,
  getUserBookmarksByBookId: (bookId: string) =>
    ['getUserBookmarksByBookId', bookId] as const,
  isReviewedByUser: (bookId: string) => ['isReviewedByUser', bookId] as const,
  isFavoritedByUser: (bookId: string) => ['isFavoritedByUser', bookId] as const,
} as const;
