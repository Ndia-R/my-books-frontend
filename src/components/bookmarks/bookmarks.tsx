import BookmarkList from '@/components/bookmarks/bookmark-list';
import PaginationUrl from '@/components/pagination-url';
import { useApiBookmark } from '@/hooks/api/use-api-bookmark';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function Bookmarks({ page }: Props) {
  const { getBookmarkPage } = useApiBookmark();

  const { data: bookmarkPage } = useSuspenseQuery({
    queryKey: ['getBookmarkPage', page],
    queryFn: () => getBookmarkPage(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookmarkPage.totalItems}
        <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
      </p>
      <BookmarkList bookmarks={bookmarkPage.bookmarks} />
      <PaginationUrl totalPages={bookmarkPage.totalPages} />
    </div>
  );
}
