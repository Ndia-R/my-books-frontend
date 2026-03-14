export const userQueryKeys = {
  getUserProfile: () => ['getUserProfile'] as const,
  getUserProfileCounts: () => ['getUserProfileCounts'] as const,
  getUserReviews: (page: number) => ['getUserReviews', page] as const,
  getUserReviewsInfinite: () => ['getUserReviewsInfinite'] as const,
  getUserFavorites: (page: number) => ['getUserFavorites', page] as const,
  getUserFavoritesInfinite: () => ['getUserFavoritesInfinite'] as const,
  getUserBookmarks: (page: number) => ['getUserBookmarks', page] as const,
  getUserBookmarksInfinite: () => ['getUserBookmarksInfinite'] as const,
  getUserBookmarksByBookId: (bookId: string) =>
    ['getUserBookmarksByBookId', bookId] as const,
  isReviewedByUser: (bookId: string) =>
    ['isReviewedByUser', bookId] as const,
  isFavoritedByUser: (bookId: string) =>
    ['isFavoritedByUser', bookId] as const,
} as const;
