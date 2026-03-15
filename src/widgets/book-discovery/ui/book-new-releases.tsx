import {
  BookList,
  bookQueryKeys,
  getBooksNewReleases,
  usePrefetchBook,
} from '@/entities/book';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookNewReleases() {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: bookQueryKeys.getBooksNewReleases(),
    queryFn: () => getBooksNewReleases(),
  });

  const { prefetchBookDetail } = usePrefetchBook();

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      {bookPage.data.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p>新着書籍はありません</p>
        </div>
      ) : (
        <BookList
          books={bookPage.data}
          onItemPrefetch={(book) => prefetchBookDetail(book.id)}
        />
      )}
    </div>
  );
}
