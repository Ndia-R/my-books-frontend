import {
  BookList,
  bookQueryKeys,
  searchBooksByGenre,
  usePrefetchBook,
} from '@/entities/book';
import { SearchPagination } from '@/features/book-search';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type Props = {
  genreIds: string;
  condition: string;
  page: number;
};

export default function BookDiscovery({ genreIds, condition, page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: bookQueryKeys.searchBooksByGenre(genreIds, condition, page),
    queryFn: () => searchBooksByGenre(genreIds, condition, page),
  });

  const { prefetchBookDetail, prefetchBookDiscover } = usePrefetchBook();

  useEffect(() => {
    if (bookPage.hasNext) {
      prefetchBookDiscover(genreIds, condition, page + 1);
    }
  }, [bookPage.hasNext, condition, genreIds, page, prefetchBookDiscover]);

  return (
    <div className="relative flex flex-col gap-y-4 pb-4">
      <p className="mr-2 space-x-1 text-right sm:absolute sm:top-1.5 sm:right-2">
        <span className="text-lg font-semibold sm:text-xl">
          {bookPage.totalItems}
        </span>
        <span className="text-muted-foreground text-sm">件</span>
      </p>

      <SearchPagination
        currentPage={bookPage.currentPage}
        totalPages={bookPage.totalPages}
      />

      {bookPage.data.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p>条件に合う書籍が見つかりませんでした</p>
        </div>
      ) : (
        <BookList
          books={bookPage.data}
          onItemPrefetch={(book) => prefetchBookDetail(book.id)}
        />
      )}

      <SearchPagination
        currentPage={bookPage.currentPage}
        totalPages={bookPage.totalPages}
      />
    </div>
  );
}
