import BookList from '@/components/books/book-list';
import PaginationUrl from '@/components/pagination-url';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  genreIds: string;
  condition: string;
  page: number;
};

export default function BooksDiscover({ genreIds, condition, page }: Props) {
  const { getBookPageByGenreId } = useApiBook();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getBookPageByGenreId', genreIds, condition, page],
    queryFn: () => getBookPageByGenreId(genreIds, condition, page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
      </p>
      <BookList books={bookPage.books} />
      <PaginationUrl totalPages={bookPage.totalPages} />
    </div>
  );
}
