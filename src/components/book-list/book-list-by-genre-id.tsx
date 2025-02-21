import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  genreId: string;
  page: number;
};

export default function BookListByGenreId({ genreId, page }: Props) {
  const { getBookPageByGenreId } = useApiBook();

  const { data: paginatedBook } = useSuspenseQuery({
    queryKey: ['getBookPageByGenreId', genreId, page],
    queryFn: () => getBookPageByGenreId(genreId, page - 1),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookPagination totalPages={paginatedBook.totalPages} />
      <BookList books={paginatedBook.books} />
      <BookPagination totalPages={paginatedBook.totalPages} />
    </div>
  );
}
