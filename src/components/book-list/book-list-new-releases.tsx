import BookList from '@/components/book-list/book-list';
import { getNewBooks } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookListNewReleases() {
  const { data: books } = useSuspenseQuery({
    queryKey: ['getNewBooks'],
    queryFn: () => getNewBooks(),
  });

  return (
    <div className="pb-4">
      <BookList books={books} />
    </div>
  );
}
