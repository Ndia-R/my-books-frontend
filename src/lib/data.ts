import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { Book, BookResponse, Genre } from '@/types/book';

export const FETCH_BOOKS_MAX_RESULTS = 20;

export const getBooksByQuery = async (q?: string, page: number = 0) => {
  if (!q) return undefined;

  const url = `${BOOKS_API_ENDPOINT}/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const bookResponse = (await fetchJSON(url)) as BookResponse;
  return convertBookResponse(bookResponse);
};

export const getBookById = async (bookId?: string) => {
  if (!bookId) return undefined;

  const url = `${BOOKS_API_ENDPOINT}/books/${bookId}`;
  const book = (await fetchJSON(url)) as Book;
  return convertBook(book);
};

export const getGenres = async () => {
  const url = `${BOOKS_API_ENDPOINT}/genres`;
  const genres = (await fetchJSON(url)) as Genre[];
  return genres;
};

export const getBooksByGenreId = async (genreIds?: number[], page: number = 0) => {
  if (!genreIds?.length) return undefined;

  const ids = genreIds.join(',');
  const url = `${BOOKS_API_ENDPOINT}/books/discover?genreId=${ids}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const bookResponse = (await fetchJSON(url)) as BookResponse;
  return convertBookResponse(bookResponse);
};

export const getNewReleases = async () => {
  // 最近リリースされた本の情報を取得（１０冊分）
  const url = `${BOOKS_API_ENDPOINT}/books/new-releases`;
  const book = (await fetchJSON(url)) as Book;
  return convertBook(book);
};

const fetchJSON = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }
  return await res.json();
};

const convertBookResponse = (bookResponse: BookResponse) => {
  bookResponse.books.forEach((book) => convertBook(book));
  return bookResponse;
};

const convertBook = (book: Book) => {
  book.imageUrl = book.imageUrl ?? '/images/no-image.png';
  return book;
};
