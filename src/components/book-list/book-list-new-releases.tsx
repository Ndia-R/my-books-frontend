import BookList from '@/components/book-list/book-list';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getNewReleases } from '@/lib/data';
import { Book } from '@/types';

export default function BookListNewReleases() {
  const { data: books } = useFetchData<Book[]>({
    queryKey: ['BookListNewReleases'],
    queryFn: () => getNewReleases(),
  });

  return (
    <div className="pb-4">
      <BookList books={books} />
    </div>
  );
}
