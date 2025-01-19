import BookList from '@/components/book-list/book-list';
import BookListSkeleton from '@/components/book-list/book-list-skeleton';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getNewReleases } from '@/lib/data';
import { Book } from '@/types';
import { Await } from 'react-router-dom';

export default function BookListNewReleases() {
  const { data: books } = useFetchData({
    queryKey: [],
    queryFn: () => getNewReleases(),
  });

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
