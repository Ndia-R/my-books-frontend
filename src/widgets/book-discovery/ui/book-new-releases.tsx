import { BookList, bookQueryKeys, getBooksNewReleases } from '@/entities/book';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function BookNewReleases() {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: bookQueryKeys.getBooksNewReleases(),
    queryFn: () => getBooksNewReleases(),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookList books={bookPage.data} />
    </div>
  );
}
