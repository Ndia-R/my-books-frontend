import BookList from '@/components/books/book-list';
import PaginationUrl from '@/components/pagination-url';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  query: string;
  page: number;
};

export default function BooksSearch({ query, page }: Props) {
  const { getBookPageByQuery } = useApiBook();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getBookPageByQuery', query, page],
    queryFn: () => getBookPageByQuery(query, page),
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
