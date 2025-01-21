import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getBooksByGenreId } from '@/lib/data';
import { PaginatedBook } from '@/types';

type Props = {
  genreId: string;
  page: number;
};

export default function BookListByGenreId({ genreId, page }: Props) {
  const { data: paginatedBook } = useFetchData<PaginatedBook>({
    queryKey: ['BookListByGenreId', genreId, page],
    queryFn: () => getBooksByGenreId(genreId, page - 1),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookPagination totalPages={paginatedBook.totalPages} />
      <BookList books={paginatedBook.books} />
      <BookPagination totalPages={paginatedBook.totalPages} />
    </div>
  );
}
