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

export const FavoriteSortOrder = {
  UpdatedAtAsc: 'updatedAt.asc',
  UpdatedAtDesc: 'updatedAt.desc',
  CreatedAtAsc: 'createdAt.asc',
  CreatedAtDesc: 'createdAt.desc',
} as const;

export type FavoriteSortOrder =
  (typeof FavoriteSortOrder)[keyof typeof FavoriteSortOrder];

export const BookmarkSortOrder = {
  UpdatedAtAsc: 'updatedAt.asc',
  UpdatedAtDesc: 'updatedAt.desc',
  CreatedAtAsc: 'createdAt.asc',
  CreatedAtDesc: 'createdAt.desc',
} as const;

export type BookmarkSortOrder =
  (typeof BookmarkSortOrder)[keyof typeof BookmarkSortOrder];
