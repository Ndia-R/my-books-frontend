export const queryKeys = {
  books: {
    all: ['books'] as const,
    details: (id: string) => [...queryKeys.books.all, 'details', id] as const,
    tableOfContents: (id: string) =>
      [...queryKeys.books.all, 'tableOfContents', id] as const,
    contentPage: (id: string, chapterNumber: number, pageNumber: number) =>
      [
        ...queryKeys.books.all,
        'contentPage',
        id,
        chapterNumber,
        pageNumber,
      ] as const,
    search: (q: string, page: number) =>
      [...queryKeys.books.all, 'search', q, page] as const,
    byGenre: (genreIds: string, condition: string, page: number) =>
      [...queryKeys.books.all, 'byGenre', genreIds, condition, page] as const,
    newBooks: () => [...queryKeys.books.all, 'new'] as const,
  },

  bookmarks: {
    all: ['bookmarks'] as const,
    byBookId: (id: string) =>
      [...queryKeys.bookmarks.all, 'byBookId', id] as const,
  },

  reviews: {
    all: ['reviews'] as const,
    byBookId: (id: string) =>
      [...queryKeys.reviews.all, 'byBookId', id] as const,
    byUser: () => [...queryKeys.reviews.all, 'byUser'] as const,
  },

  genres: {
    all: ['genres'] as const,
  },

  favorites: {
    all: ['favorites'] as const,
    byUser: () => [...queryKeys.favorites.all, 'byUser'] as const,
  },

  users: {
    all: ['users'] as const,
    me: () => [...queryKeys.users.all, 'me'] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
  },
};
