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
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookList books={bookPage.books} />
    </div>
  );
}
