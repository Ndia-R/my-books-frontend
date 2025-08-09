import BookmarkList from '@/components/bookmarks/bookmark-list';
import SearchPagination from '@/components/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { getUserBookmarks } from '@/lib/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function Bookmarks({ page }: Props) {
  const { data: bookmarkPage } = useSuspenseQuery({
    queryKey: queryKeys.user.bookmarks(page),
    queryFn: () => getUserBookmarks(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookmarkPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookmarkList bookmarks={bookmarkPage.data} />
      <SearchPagination totalPages={bookmarkPage.totalPages} />
    </div>
  );
}
