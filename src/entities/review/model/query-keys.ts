export const reviewQueryKeys = {
  getUserReviews: (page: number) => ['getUserReviews', page] as const,
  getUserReviewsInfinite: () => ['getUserReviewsInfinite'] as const,
  isReviewedByUser: (bookId: string) => ['isReviewedByUser', bookId] as const,
} as const;
