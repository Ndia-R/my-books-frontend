import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { getBookPageByQuery } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  query: string;
  page: number;
};

export default function BookListByQuery({ query, page }: Props) {
  const { data: paginatedBook } = useSuspenseQuery({
    queryKey: ['getBookPageByQuery', query, page],
    queryFn: () => getBookPageByQuery(query, page - 1),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookPagination totalPages={paginatedBook.totalPages} />
      <BookList books={paginatedBook.books} />
      <BookPagination totalPages={paginatedBook.totalPages} />
    </div>
  );
}
