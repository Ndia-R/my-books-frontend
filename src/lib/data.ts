import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { fetchWithAuth } from '@/lib/auth';
import { Book, Genre, PaginatedBook } from '@/types/book';
import { Review } from '@/types/review';
import { CheckNameExistsResponse, User } from '@/types/user';

export const FETCH_BOOKS_MAX_RESULTS = 20;

export const getBooksByQuery = async (q?: string, page: number = 0) => {
  if (!q) return emptyPaginatedBook();

  try {
    const url = `/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = (await fetchJSON(url)) as PaginatedBook;
    return convertBookResponse(paginatedBook);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getBookById = async (bookId?: string) => {
  if (!bookId) return null;

  try {
    const url = `/books/${bookId}`;
    const book = (await fetchJSON(url)) as Book;
    return convertBook(book);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getGenres = async () => {
  try {
    const url = `/genres`;
    const genres = (await fetchJSON(url)) as Genre[];
    return genres;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getBooksByGenreId = async (genreIdsQuery?: string, page: number = 0) => {
  if (!genreIdsQuery) return emptyPaginatedBook();

  try {
    // 「|」はそのまま渡すとエラーになるので、URLエンコードする
    const encodedParams = genreIdsQuery.replace(/\|/g, encodeURIComponent('|'));

    const url = `/books/discover?genreId=${encodedParams}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = (await fetchJSON(url)) as PaginatedBook;
    return convertBookResponse(paginatedBook);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getNewReleases = async () => {
  try {
    const url = `/books/new-releases`;
    const books = (await fetchJSON(url)) as Book[];
    return convertBooks(books);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getCurrentUser = async () => {
  try {
    const url = `/me`;
    const user = (await fetchWithAuth(url)) as User;
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const checkNameExists = async (name: string) => {
  try {
    const url = `/check-name-exists?name=${name}`;
    const data = (await fetchJSON(url)) as CheckNameExistsResponse;
    return data.exists;
  } catch (e) {
    console.error(e);
    return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
  }
};

export const getReviewsByBookId = async (bookId?: string) => {
  if (!bookId) return null;

  try {
    const url = `/reviews/book/${bookId}`;
    const reviews = (await fetchJSON(url)) as Review[];
    return reviews;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchJSON = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(`失敗しました。URL: ${url} ステータス: ${res.status}`);
  }
  return res.json();
};

const convertBook = (book: Book) => {
  book.imageUrl = book.imageUrl ?? '/images/no-image.png';
  return book;
};

const convertBooks = (books: Book[]) => {
  return books.map((book) => convertBook(book));
};

const convertBookResponse = (paginatedBook: PaginatedBook) => {
  paginatedBook.books = convertBooks(paginatedBook.books);
  return paginatedBook;
};

const emptyPaginatedBook = (): PaginatedBook => {
  return {
    page: 0,
    totalPages: 0,
    totalItems: 0,
    books: [],
  };
};
