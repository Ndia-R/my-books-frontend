import FavoriteList from '@/components/favorites/favorite-list';
import SearchPagination from '@/components/search-pagination';
import { useApiFavorite } from '@/hooks/api/use-api-favorite';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function Favorites({ page }: Props) {
  const { getFavoritePage } = useApiFavorite();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getFavoritePage', page],
    queryFn: () => getFavoritePage(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <FavoriteList favorites={bookPage.favorites} />
      <SearchPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
