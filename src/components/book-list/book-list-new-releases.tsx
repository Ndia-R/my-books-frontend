import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getNewReleases } from '@/lib/data';
import { Book } from '@/types/book';
import { useCallback } from 'react';
import { Await } from 'react-router-dom';

export default function BookListNewReleases() {
  const fetcher = useCallback(() => getNewReleases(), []);

  const { data: books } = useFetchData({ fetcher });

  return (
    <Await resolve={books}>
      {(books: Book[]) => {
        if (!books) return <BookListSkeleton paginationOff />;
        return (
          <div className="pb-4">
            <BookList books={books} />
          </div>
        );
      }}
    </Await>
  );
}
