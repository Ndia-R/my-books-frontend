import type { Genre } from '@/entities/genre/model/types';
import { fetchBooksApi } from '@/shared/api/fetch';

// すべてのジャンル取得
export const getGenres = async () => {
  const path = `/genres`;
  const response = await fetchBooksApi<Genre[]>(path);
  return response.data;
};
