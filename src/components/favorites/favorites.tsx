import FavoriteList from '@/components/favorites/favorite-list';
import SearchPagination from '@/components/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { getUserFavorites } from '@/lib/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function Favorites({ page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: queryKeys.user.favorites(page),
    queryFn: () => getUserFavorites(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <FavoriteList favorites={bookPage.data} />
      <SearchPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
