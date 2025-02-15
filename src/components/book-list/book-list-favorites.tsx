import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { getFavoritePage } from '@/lib/data';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function BookListFavorites({ page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getFavoritePage', page],
    queryFn: () => getFavoritePage(page - 1),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookPagination totalPages={bookPage.totalPages} />
      <BookList books={bookPage.favorites.map((favorite) => favorite.book)} />
      <BookPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
