import BookList from '@/components/books/book-list';
import SearchPagination from '@/components/shared/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { searchBooksByTitleKeyword } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  q: string;
  page: number;
};

export default function BooksSearch({ q, page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.book.byTitleKeyword(q, page),
    queryFn: () => searchBooksByTitleKeyword(q, page),
  });

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
