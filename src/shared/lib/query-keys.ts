import { bookQueryKeys } from '@/entities/book/model/query-keys';
import { bookmarkQueryKeys } from '@/entities/bookmark/model/query-keys';
import { favoriteQueryKeys } from '@/entities/favorite/model/query-keys';
import { genreQueryKeys } from '@/entities/genre/model/query-keys';
import { reviewQueryKeys } from '@/entities/review/model/query-keys';
import { userQueryKeys } from '@/entities/user/model/query-keys';

export const queryKeys = {
  ...bookQueryKeys,
  ...bookmarkQueryKeys,
  ...favoriteQueryKeys,
  ...genreQueryKeys,
  ...reviewQueryKeys,
  ...userQueryKeys,
} as const;
