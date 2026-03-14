import { deleteFavoriteByBookId } from '@/entities/favorite/api/favorites';
import type { Favorite } from '@/entities/favorite/model/types';
import { buildPath } from '@/shared/api/url-builder';
import {
  BOOK_IMAGE_BASE_URL,
  TOAST_ERROR_DURATION,
} from '@/shared/config/constants';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import usePrefetch from '@/shared/hooks/use-prefetch';
import {
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { queryKeys } from '@/shared/lib/query-keys';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

type Props = {
  favorite: Favorite;
};

export default function FavoriteItem({ favorite }: Props) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.getUserFavoritesInfinite(),
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

  const { prefetchBookDetail } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookDetail(favorite.book.id);
  };

  const bookDetailPath = buildPath('/books/:bookId', {
    bookId: favorite.book.id,
  });

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link
              className="size-fit"
              to={bookDetailPath}
              aria-label={`${favorite.book.title}の詳細ページへ移動`}
              onMouseEnter={handlePrefetch}
              onFocus={handlePrefetch}
            >
              <img
                className="h-24 rounded-xs object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + favorite.book.imagePath}
                alt={favorite.book.title}
              />
            </Link>
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-x-2">
                <Link
                  className="size-fit"
                  to={bookDetailPath}
                  aria-label={`${favorite.book.title}の詳細ページへ移動`}
                  onMouseEnter={handlePrefetch}
                  onFocus={handlePrefetch}
                >
                  <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                    {favorite.book.title}
                  </h2>
                </Link>

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
              </div>

              <time
                className="text-muted-foreground mr-1 text-sm"
                dateTime={
                  Date.parse(favorite.updatedAt) ? favorite.updatedAt : ''
                }
                title={`${formatDateJP(favorite.updatedAt)} ${formatTime(favorite.updatedAt)}`}
              >
                {formatRelativeTime(favorite.updatedAt)}
              </time>
            </div>

            <p className="text-muted-foreground flex gap-x-3 text-sm">
              <span>著者</span>
              {favorite.book.authors.map((author) => (
                <span key={author}>{author}</span>
              ))}
            </p>

            <p className="text-muted-foreground">{favorite.book.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
