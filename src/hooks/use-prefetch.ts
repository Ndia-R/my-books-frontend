import { queryKeys } from '@/constants/query-keys';
import {
  getBookChapterPageContent,
  getBookDetails,
  getBookFavoriteStats,
  getBookTableOfContents,
  searchBooksByGenre,
  searchBooksByTitleKeyword,
} from '@/lib/api/books';
import { getUserBookmarksByBookId } from '@/lib/api/user';
import { useQueryClient } from '@tanstack/react-query';

export default function usePrefetch() {
  const queryClient = useQueryClient();

  // タイトル検索
  const prefetchBookSearch = (q: string, page: number = 1) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.searchBooksByTitleKeyword(q, page),
      queryFn: () => searchBooksByTitleKeyword(q, page),
      staleTime: 1000 * 60,
    });
  };

  // ジャンル検索
  const prefetchBookDiscover = (
    genreIds: string,
    condition: string = 'SINGLE',
    page: number = 1
  ) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.searchBooksByGenre(genreIds, condition, page),
      queryFn: () => searchBooksByGenre(genreIds, condition, page),
      staleTime: 1000 * 60,
    });
  };

  // 書籍の詳細
  const prefetchBookDetail = (bookId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.getBookDetails(bookId),
      queryFn: () => getBookDetails(bookId),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.getBookFavoriteStats(bookId),
      queryFn: () => getBookFavoriteStats(bookId),
      staleTime: 1000 * 60,
    });
  };

  // 書籍の目次
  const prefetchBookTableOfContents = (bookId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.getBookTableOfContents(bookId),
      queryFn: () => getBookTableOfContents(bookId),
      staleTime: Infinity,
    });
  };

  // 書籍の内容
  const prefetchBookReadContent = (
    bookId: string,
    chapterNumber: number = 1,
    pageNumber: number = 1
  ) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.getBookTableOfContents(bookId),
      queryFn: () => getBookTableOfContents(bookId),
      staleTime: Infinity,
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.getBookChapterPageContent(
        bookId,
        chapterNumber,
        pageNumber
      ),
      queryFn: () =>
        getBookChapterPageContent(bookId, chapterNumber, pageNumber),
      staleTime: Infinity,
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.getUserBookmarksByBookId(bookId),
      queryFn: () => getUserBookmarksByBookId(bookId),
      staleTime: 1000 * 60,
    });
  };

  return {
    prefetchBookSearch,
    prefetchBookDiscover,
    prefetchBookDetail,
    prefetchBookTableOfContents,
    prefetchBookReadContent,
  };
}
