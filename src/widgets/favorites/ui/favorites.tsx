import { usePrefetchBook } from '@/entities/book';
import {
  deleteFavoriteByBookId,
  FavoriteList,
  favoriteQueryKeys,
  getUserFavorites,
  type Favorite,
  type FavoritePage,
} from '@/entities/favorite';
import { TOAST_ERROR_DURATION } from '@/shared/config/constants';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { HeartIcon, Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

function FavoriteDeleteAction({ favorite }: { favorite: Favorite }) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: favoriteQueryKeys.getUserFavoritesInfinite(),
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (bookId: string) => deleteFavoriteByBookId(bookId),
    onSuccess,
  });

  const { confirmDialog } = useConfirmDialog();

  const handleClickDelete = async () => {
    const { isCancel } = await confirmDialog({
      icon: 'warning',
      title: 'このお気に入りを削除しますか？',
      message: 'お気に入りリストから削除されます。',
    });
    if (isCancel) return;

    deleteMutation.mutate(favorite.book.id, {
      onSuccess: () => {
        toast.success('お気に入りリストから削除しました');
      },
      onError: () => {
        toast.error('お気に入りの削除に失敗しました', {
          duration: TOAST_ERROR_DURATION,
        });
      },
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            'text-muted-foreground hover:text-primary size-8',
            'text-primary bg-transparent'
          )}
          variant="ghost"
          size="icon"
          aria-label="お気に入り"
          onClick={() => handleClickDelete()}
        >
          <HeartIcon className="fill-primary" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>お気に入りから削除</TooltipContent>
    </Tooltip>
  );
}

export default function Favorites() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: favoriteQueryKeys.getUserFavoritesInfinite(),
      queryFn: ({ pageParam }) => getUserFavorites(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: FavoritePage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const favorites = data.pages.flatMap((page) => page.data);

  const { prefetchBookDetail } = usePrefetchBook();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6 space-x-1 text-right">
        <span className="text-lg font-semibold sm:text-xl">{totalItems}</span>
        <span className="text-muted-foreground text-sm">件</span>
      </p>

      {favorites.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p>お気に入りがありません</p>
        </div>
      ) : (
        <FavoriteList
          favorites={favorites}
          onItemPrefetch={(favorite) => prefetchBookDetail(favorite.book.id)}
          renderAction={(favorite) => (
            <FavoriteDeleteAction favorite={favorite} />
          )}
        />
      )}

      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          {isFetchingNextPage && (
            <Loader2Icon
              className="text-muted-foreground animate-spin"
              aria-label="お気に入りを読み込み中"
              role="status"
            />
          )}
        </div>
      )}
    </div>
  );
}
