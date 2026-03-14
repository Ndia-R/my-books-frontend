import { searchBooksByTitleKeyword } from '@/entities/book/api/books';
import BookList from '@/entities/book/ui/book-list';
import SearchPagination from '@/features/book-search/ui/search-pagination';
import usePrefetch from '@/shared/hooks/use-prefetch';
import { queryKeys } from '@/shared/lib/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type Props = {
  q: string;
  page: number;
};

export default function BookSearch({ q, page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.searchBooksByTitleKeyword(q, page),
    queryFn: () => searchBooksByTitleKeyword(q, page),
  });

  const { prefetchBookSearch } = usePrefetch();

  useEffect(() => {
    if (bookPage.hasNext) {
      prefetchBookSearch(q, page + 1);
    }
  }, [bookPage.hasNext, page, prefetchBookSearch, q]);

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

      <BookList books={bookPage.data} />

      <SearchPagination
        currentPage={bookPage.currentPage}
        totalPages={bookPage.totalPages}
      />
    </div>
  );
}
