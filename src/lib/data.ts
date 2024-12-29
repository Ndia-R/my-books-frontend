import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { fetchWithAuth } from '@/lib/auth';
import { Book, Genre, PaginatedBook } from '@/types/book';
import { User } from '@/types/user';

export const FETCH_BOOKS_MAX_RESULTS = 20;

export const fetchJSON = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }
  return res.json();
};

export const getBooksByQuery = async (q?: string, page: number = 0) => {
  if (!q) return undefined;

  const url = `/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const paginatedBook = (await fetchJSON(url)) as PaginatedBook;
  return convertBookResponse(paginatedBook);
};

export const getBookById = async (bookId?: string) => {
  if (!bookId) return undefined;

  const url = `/books/${bookId}`;
  const book = (await fetchJSON(url)) as Book;
  return convertBook(book);
};

export const getGenres = async () => {
  const url = `/genres`;
  const genres = (await fetchJSON(url)) as Genre[];
  return genres;
};

export const getBooksByGenreId = async (genreIds?: number[], page: number = 0) => {
  if (!genreIds?.length) return undefined;

  const ids = genreIds.join(',');
  const url = `/books/discover?genreId=${ids}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const paginatedBook = (await fetchJSON(url)) as PaginatedBook;
  return convertBookResponse(paginatedBook);
};

export const getNewReleases = async () => {
  const url = `/books/new-releases`;
  const book = (await fetchJSON(url)) as Book;
  return convertBook(book);
};

export const getCurrentUser = async () => {
  const url = `/me`;
  const user = (await fetchWithAuth(url)) as User;
  return user;
};

export const checkUsernameExists = async (username: string) => {
  const url = `/check-username-exists?username=${username}`;
  const data = await fetchJSON(url);
  return data.exists;
};

const convertBookResponse = (paginatedBook: PaginatedBook) => {
  paginatedBook.books.forEach((book) => convertBook(book));
  return paginatedBook;
};

const convertBook = (book: Book) => {
  book.imageUrl = book.imageUrl ?? '/images/no-image.png';
  return book;
};
