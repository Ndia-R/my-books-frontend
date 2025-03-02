import BookList from '@/components/books/book-list';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BooksNewReleases() {
  const { getNewBooks } = useApiBook();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getNewBooks'],
    queryFn: () => getNewBooks(),
  });

  return (
    <div className="pb-4">
      <BookList books={bookPage.books} />
    </div>
  );
}
