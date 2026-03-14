export const bookmarkQueryKeys = {
  getUserBookmarks: (page: number) => ['getUserBookmarks', page] as const,
  getUserBookmarksInfinite: () => ['getUserBookmarksInfinite'] as const,
  getUserBookmarksByBookId: (bookId: string) =>
    ['getUserBookmarksByBookId', bookId] as const,
} as const;
