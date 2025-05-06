import { customFetch } from '@/lib/api/fetch-client';
import { FavoriteRequest } from '@/types';

// お気に入り追加
export const createFavorite = async (requestBody: FavoriteRequest) => {
  try {
    const endpoint = `/favorites`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの作成に失敗しました。');
  }
};

// お気に入り削除
export const deleteFavorite = async (bookId: string) => {
  try {
    const endpoint = `/favorites/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの削除に失敗しました。');
  }
};
