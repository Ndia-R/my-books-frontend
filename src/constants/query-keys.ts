export const queryKeys = {
  book: {
    all: ['book'] as const,
    newReleases: () => [...queryKeys.book.all, 'newReleases'] as const,
    byTitleKeyword: (q: string, page: number) =>
      [...queryKeys.book.all, 'byTitleKeyword', q, page] as const,
    byGenre: (genreIds: string, condition: string, page: number) =>
      [...queryKeys.book.all, 'byGenre', genreIds, condition, page] as const,
    details: (bookId: string) =>
      [...queryKeys.book.all, 'details', bookId] as const,
    tableOfContents: (bookId: string) =>
      [...queryKeys.book.all, 'tableOfContents', bookId] as const,
    chapterPageContent: (
      bookId: string,
      chapterNumber: number,
      pageNumber: number
    ) =>
      [
        ...queryKeys.book.all,
        'chapterPageContent',
        bookId,
        chapterNumber,
        pageNumber,
      ] as const,
    reviews: (bookId: string, page: number) =>
      [...queryKeys.book.all, 'reviews', bookId, page] as const,
    reviewStats: (bookId: string) =>
      [...queryKeys.book.all, 'reviewStats', bookId] as const,
    favoriteStats: (bookId: string) =>
      [...queryKeys.book.all, 'favoriteStats', bookId] as const,
  },

  genre: {
    all: ['genre'] as const,
  },

  review: {
    all: ['review'] as const,
  },

  bookmark: {
    all: ['bookmark'] as const,
  },

  favorite: {
    all: ['favorite'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    profileCounts: () => [...queryKeys.user.all, 'profileCounts'] as const,
    reviews: (page: number) =>
      [...queryKeys.user.all, 'reviews', page] as const,
    favorites: (page: number) =>
      [...queryKeys.user.all, 'favorites', page] as const,
    bookmarks: (page: number) =>
      [...queryKeys.user.all, 'bookmarks', page] as const,
    reviewsByBookId: (bookId: string) =>
      [...queryKeys.user.all, 'reviewsByBookId', bookId] as const,
    favoritesByBookId: (bookId: string) =>
      [...queryKeys.user.all, 'favoritesByBookId', bookId] as const,
    bookmarksByBookId: (bookId: string) =>
      [...queryKeys.user.all, 'bookmarksByBookId', bookId] as const,
    isReviewedByUser: (bookId: string) =>
      [...queryKeys.user.all, 'isReviewedByUser', bookId] as const,
    isFavoritedByUser: (bookId: string) =>
      [...queryKeys.user.all, 'isFavoritedByUser', bookId] as const,
  },
};
