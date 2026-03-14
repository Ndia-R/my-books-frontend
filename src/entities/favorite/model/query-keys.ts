export const favoriteQueryKeys = {
  getUserFavorites: (page: number) => ['getUserFavorites', page] as const,
  getUserFavoritesInfinite: () => ['getUserFavoritesInfinite'] as const,
  isFavoritedByUser: (bookId: string) => ['isFavoritedByUser', bookId] as const,
} as const;
