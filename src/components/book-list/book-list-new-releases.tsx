import BookList from '@/components/book-list/book-list';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookListNewReleases() {
  const { getNewBooks } = useApiBook();

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
