import BookList from '@/components/books/book-list';
import { queryKeys } from '@/constants/query-keys';
import { getLatestBooks } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BooksNewReleases() {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.book.latestBooks(),
    queryFn: () => getLatestBooks(),
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
