import { customFetch } from '@/lib/api/fetch-client';
import { Genre } from '@/types';

// すべてのジャンル取得
export const getGenres = async () => {
  const endpoint = `/genres`;
  const response = await customFetch<Genre[]>(endpoint);
  return response.data;
};
