import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { fetchWithAuth } from '@/lib/auth';
import { Book, Genre, PaginatedBook } from '@/types/book';
import { ChangePasswordRequest, CheckUsernameExistsResponse, User } from '@/types/user';

export const FETCH_BOOKS_MAX_RESULTS = 20;

export const getBooksByQuery = async (q?: string, page: number = 0) => {
  if (!q) return null;

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
  if (!genreIdsQuery) return null;

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

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: ChangePasswordRequest) => {
  try {
    const url = `/me/password`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
    };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const checkUsernameExists = async (username: string) => {
  try {
    const url = `/check-username-exists?username=${username}`;
    const data = (await fetchJSON(url)) as CheckUsernameExistsResponse;
    return data.exists;
  } catch (e) {
    console.error(e);
    return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
  }
};

const fetchJSON = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
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
