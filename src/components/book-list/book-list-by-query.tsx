import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  query: string;
  page: number;
};

export default function BookListByQuery({ query, page }: Props) {
  const { getBookPageByQuery } = useApiBook();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getBookPageByQuery', query, page],
    queryFn: () => getBookPageByQuery(query, page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookList books={bookPage.books} />
      <BookPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
