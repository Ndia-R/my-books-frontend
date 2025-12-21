import BookList from '@/components/books/book-list';
import { queryKeys } from '@/constants/query-keys';
import { getBooksNewReleases } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookNewReleases() {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.getBooksNewReleases(),
    queryFn: () => getBooksNewReleases(),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookList books={bookPage.data} />
    </div>
  );
}
