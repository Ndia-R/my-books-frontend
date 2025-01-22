import BookList from '@/components/book-list/book-list';
import { getNewReleases } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookListNewReleases() {
  const { data: books } = useSuspenseQuery({
    queryKey: ['getNewReleases'],
    queryFn: () => getNewReleases(),
  });

  return (
    <div className="pb-4">
      <BookList books={books} />
    </div>
  );
}
