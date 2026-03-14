import { bookQueryKeys } from '@/entities/book/model/query-keys';
import { bookmarkQueryKeys } from '@/entities/bookmark/model/query-keys';
import { genreQueryKeys } from '@/entities/genre/model/query-keys';
import { userQueryKeys } from '@/entities/user/model/query-keys';

export const queryKeys = {
  ...bookQueryKeys,
  ...bookmarkQueryKeys,
  ...genreQueryKeys,
  ...userQueryKeys,
} as const;
