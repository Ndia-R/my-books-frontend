// import { getUser } from '@/lib/auth';
// import prisma from '@/lib/db';
import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { Book, BookResponse, Genre } from '@/types/book';

export const FETCH_BOOKS_MAX_RESULTS = 20;

/**
 * 書籍の検索
 * @param q クエリ文字列
 * @param page? ページ番号のインデックス（0 から開始）
 * @return Promise<BookResponse | undefined>
 */
export const getBooksByQuery = async (q: string | undefined | null, page: number = 0) => {
  if (!q) return undefined;

  const url = `${BOOKS_API_ENDPOINT}/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  const bookResponse = (await res.json()) as BookResponse;

  return convertBookResponse(bookResponse);
};

/**
 * １冊分の本の情報を取得
 * @param bookId 取得する書籍のID
 * @return Promise<Book | undefined>
 */
export const getBookById = async (bookId: string | undefined) => {
  if (!bookId) return undefined;

  const url = `${BOOKS_API_ENDPOINT}/books/${bookId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  const book = (await res.json()) as Book;

  return convertBook(book);
};

/**
 * ジャンル一覧の取得
 * @return Promise<Genre[]>
 */
export const getGenres = async () => {
  const url = `${BOOKS_API_ENDPOINT}/genres`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  const genres = (await res.json()) as Genre[];

  return genres;
};

/**
 * ジャンル検索
 * @param genreIds ジャンルID
 * @param page? ページ番号のインデックス（0 から開始）
 * @return Promise<BookResponse | undefined>
 */
export const getBooksByGenreId = async (
  genreIds: number[] | undefined | null,
  page: number = 0
) => {
  if (!genreIds?.length) return undefined;

  const ids = genreIds.join(',');
  const url = `${BOOKS_API_ENDPOINT}/books/discover?genreId=${ids}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  const bookResponse = (await res.json()) as BookResponse;

  return convertBookResponse(bookResponse);
};

/**
 * 最近リリースされた本の情報を取得（１０冊分）
 * @return Promise<Book>
 */
export const getNewReleases = async () => {
  const url = `${BOOKS_API_ENDPOINT}/books/new-releases`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  const book = (await res.json()) as Book;

  return convertBook(book);
};

/**
 * お気に入り一覧取得
 * @return Book[]
 */
export const fetchFavorites = async () => {
  // const user = getUser();
  // const favorites = await prisma.favoriteBook.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });
  // const books = favorites.map((favorite) => ({
  //   id: favorite.bookId,
  //   title: favorite.title,
  //   imageUrl: favorite.imageUrl,
  //   authors: [],
  //   publisher: '',
  //   publishedDate: '',
  //   description: '',
  //   webReaderLink: '',
  //   pageCount: 0,
  //   price: 0,
  //   isFavorite: true,
  // }));
  // return books;
};

/**
 * 閲覧履歴一覧取得
 * @return Book[]
 */
export const getBrowsingHistory = async () => {
  // const user = getUser();
  // const histories = await prisma.bookBrowsingHistory.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });
  // const favorites = await prisma.favoriteBook.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  //   select: {
  //     bookId: true,
  //   },
  // });
  // const books = histories.map((history) => ({
  //   id: history.bookId,
  //   title: history.title,
  //   imageUrl: history.imageUrl,
  //   authors: [],
  //   publisher: '',
  //   publishedDate: '',
  //   description: '',
  //   webReaderLink: '',
  //   pageCount: 0,
  //   price: 0,
  //   isFavorite: favorites.find((favorite) => favorite.bookId === history.bookId)
  //     ? true
  //     : false,
  // }));
  // return books;
};

const convertBook = (book: Book) => {
  book.imageUrl = book.imageUrl ?? '/images/no-image.png';
  return book;
};

const convertBookResponse = (bookResponse: BookResponse) => {
  bookResponse.books.forEach((book) => convertBook(book));
  return bookResponse;
};
