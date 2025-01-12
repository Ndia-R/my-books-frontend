import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import BookPagination from '@/components/book-list/book-pagination';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getBooksByGenreId } from '@/lib/data';
import { PaginatedBook } from '@/types/book';
import { useCallback } from 'react';
import { Await } from 'react-router-dom';

type Props = {
  genreId: string;
  page: number;
};

export default function BookListByGenreId({ genreId, page }: Props) {
  const fetcher = useCallback(
    () => getBooksByGenreId(genreId, page - 1),
    [genreId, page]
  );

  const { data: paginatedBook } = useFetchData({ fetcher });

  return (
    <Await resolve={paginatedBook}>
      {(paginatedBook: PaginatedBook) => {
        if (!paginatedBook) return <BookListSkeleton />;
        return (
          <div className="flex flex-col gap-y-4 pb-4">
            <BookPagination totalPages={paginatedBook.totalPages} />
            <BookList books={paginatedBook.books} />
            <BookPagination totalPages={paginatedBook.totalPages} />
          </div>
        );
      }}
    </Await>
  );
}
