import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { useApiFavorite } from '@/hooks/api/use-api-favorite';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function BookListFavorites({ page }: Props) {
  const { getFavoritePage } = useApiFavorite();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getFavoritePage', page],
    queryFn: () => getFavoritePage(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <BookList books={bookPage.favorites.map((favorite) => favorite.book)} />
      <BookPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
