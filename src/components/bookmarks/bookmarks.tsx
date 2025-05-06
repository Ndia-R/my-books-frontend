import BookmarkList from '@/components/bookmarks/bookmark-list';
import SearchPagination from '@/components/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { deleteBookmark, updateBookmark } from '@/lib/api/bookmarks';
import { getUserBookmarks } from '@/lib/api/user';
import { BookmarkRequest } from '@/types';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function Bookmarks({ page }: Props) {
  const { updateQueryParams } = useSearchFilters();
  const queryClient = useQueryClient();

  const { data: bookmarkPage } = useSuspenseQuery({
    queryKey: queryKeys.user.bookmarks(page),
    queryFn: () => getUserBookmarks(page),
  });

  const onError = (error: Error) => {
    console.error(error);
  };

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: number;
      requestBody: BookmarkRequest;
    }) => updateBookmark(id, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.bookmarks(page),
      });
    },
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookmarkId: number) => deleteBookmark(bookmarkId),
    onSuccess: () => {
      // ２ページ以降で、そのページの最後の１つを削除した場合は、１ページ戻る
      if (page >= 2 && bookmarkPage.bookmarks.length === 1) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.bookmarks(page - 1),
        });
        updateQueryParams({ page: page - 1 });
        return;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.user.bookmarks(page),
      });
    },
    onError,
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookmarkPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookmarkList
        bookmarks={bookmarkPage.bookmarks}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
      <SearchPagination totalPages={bookmarkPage.totalPages} />
    </div>
  );
}
