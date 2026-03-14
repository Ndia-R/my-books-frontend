import { bookQueryKeys } from '@/entities/book/model/query-keys';
import { genreQueryKeys } from '@/entities/genre/model/query-keys';
import { userQueryKeys } from '@/entities/user/model/query-keys';

export const queryKeys = {
  ...bookQueryKeys,
  ...genreQueryKeys,
  ...userQueryKeys,
} as const;
