import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { fetchWithAuth } from '@/lib/auth';
import { Book, Genre, PaginatedBook } from '@/types/book';
import { Review } from '@/types/review';
import { CheckNameExists, ProfileCounts, User, UserDetails } from '@/types/user';

export const FETCH_BOOKS_MAX_RESULTS = 20;

export const getGenres = async () => {
  try {
    const url = `/genres`;
    const genres = await fetchJSON<Genre[]>(url);
    return genres;
  } catch {
    throw new Error('ジャンル一覧の読み込みが失敗しました。');
  }
};

export const getBookById = async (bookId: string) => {
  try {
    const url = `/books/${bookId}`;
    const book = await fetchJSON<Book>(url);
    return book;
  } catch {
    throw new Error('書籍情報の読み込みが失敗しました。');
  }
};

export const getBooksByQuery = async (q: string, page: number = 0) => {
  try {
    const url = `/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJSON<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('書籍検索が失敗しました。');
  }
};

export const getBooksByGenreId = async (genreIdsQuery: string, page: number = 0) => {
  try {
    // 「|」はそのまま渡すとエラーになるので、URLエンコードする
    const encodedParams = genreIdsQuery.replace(/\|/g, encodeURIComponent('|'));

    const url = `/books/discover?genreId=${encodedParams}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJSON<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('ジャンル検索が失敗しました。');
  }
};

export const getFavorites = async (userId: number, page: number = 0) => {
  try {
    const url = `/favorites/user/${userId}?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchWithAuth<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};

export const getNewReleases = async () => {
  try {
    const url = `/books/new-releases`;
    const books = await fetchJSON<Book[]>(url);
    return books;
  } catch {
    throw new Error('ニューリリース一覧の読み込みが失敗しました。');
  }
};

export const getCurrentUser = async (): Promise<UserDetails | null> => {
  try {
    const url_user = `/me`;
    const user = await fetchWithAuth<User>(url_user);

    const url_counts = `/me/profile-counts`;
    const profieleCounts = await fetchWithAuth<ProfileCounts>(url_counts);

    if (user === null || profieleCounts === null) return null;

    return { user, profieleCounts };
  } catch {
    throw new Error('ユーザー情報の読み込みが失敗しました。');
  }
};

export const checkNameExists = async (name: string) => {
  try {
    const url = `/check-name-exists?name=${name}`;
    const data = await fetchJSON<CheckNameExists>(url);
    return data.exists;
  } catch {
    return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
  }
};

export const getReviewsByBookId = async (bookId: string) => {
  try {
    const url = `/reviews/book/${bookId}`;
    const reviews = await fetchJSON<Review[]>(url);
    return reviews;
  } catch {
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

const fetchJSON = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(`失敗しました。URL: ${url} ステータス: ${res.status}`);
  }
  return res.json();
};
