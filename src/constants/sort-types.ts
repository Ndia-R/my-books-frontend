/**
 * 書籍検索のソート順定義
 */
export const BookSortOrder = {
  TitleAsc: 'title.asc',
  TitleDesc: 'title.desc',
  PublicationDateAsc: 'publicationDate.asc',
  PublicationDateDesc: 'publicationDate.desc',
  ReviewCountAsc: 'reviewCount.asc',
  ReviewCountDesc: 'reviewCount.desc',
  AverageRatingAsc: 'averageRating.asc',
  AverageRatingDesc: 'averageRating.desc',
  PopularityAsc: 'popularity.asc',
  PopularityDesc: 'popularity.desc',
} as const;

export type BookSortOrder = (typeof BookSortOrder)[keyof typeof BookSortOrder];

/**
 * レビュー、お気に入り、ブックマークのソート順定義（共通）
 */
export const ReviewSortOrder = {
  UpdatedAtAsc: 'updatedAt.asc',
  UpdatedAtDesc: 'updatedAt.desc',
  CreatedAtAsc: 'createdAt.asc',
  CreatedAtDesc: 'createdAt.desc',
  RatingAsc: 'rating.asc',
  RatingDesc: 'rating.desc',
} as const;

export type ReviewSortOrder =
  (typeof ReviewSortOrder)[keyof typeof ReviewSortOrder];
