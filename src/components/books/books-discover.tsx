import BookList from '@/components/books/book-list';
import SearchPagination from '@/components/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { searchBooksByGenre } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  genreIds: string;
  condition: string;
  page: number;
};

export default function BooksDiscover({ genreIds, condition, page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.book.byGenre(genreIds, condition, page),
    queryFn: () => searchBooksByGenre(genreIds, condition, page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookList books={bookPage.books} />
      <SearchPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
