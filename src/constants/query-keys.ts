export const queryKeys = {
  book: {
    all: ['book'] as const,
    latestBooks: () => [...queryKeys.book.all, 'latestBooks'] as const,
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
    reviewCounts: (bookId: string) =>
      [...queryKeys.book.all, 'reviewCounts', bookId] as const,
    favoriteCounts: (bookId: string) =>
      [...queryKeys.book.all, 'favoriteCounts', bookId] as const,
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
    reviewForBook: (bookId: string) =>
      [...queryKeys.user.all, 'reviewForBook', bookId] as const,
    favoriteForBook: (bookId: string) =>
      [...queryKeys.user.all, 'favoriteForBook', bookId] as const,
    bookmarksForBook: (bookId: string) =>
      [...queryKeys.user.all, 'bookmarksForBook', bookId] as const,
    isBookFavoritedByUser: (bookId: string) =>
      [...queryKeys.user.all, 'isBookFavoritedByUser', bookId] as const,
  },
};
