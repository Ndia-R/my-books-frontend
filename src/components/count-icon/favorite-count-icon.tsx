import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { queryKeys } from '@/constants/query-keys';
import { getBookFavoriteCounts } from '@/lib/api/books';
import { createFavorite, deleteFavorite } from '@/lib/api/favorite';
import { getUserFavoriteForBook } from '@/lib/api/user';
import { cn } from '@/lib/utils';
import { useUser } from '@/providers/user-provider';
import { useQuery } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { startTransition, useOptimistic, useState } from 'react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type AA = {
  likes: number;
  isLiked: boolean;
};

type Props = {
  bookId: string;
  size?: 'sm' | 'md';
  showCount?: boolean;
};

export default function FavoriteCountIcon({
  bookId,
  size = 'md',
  showCount = false,
}: Props) {
  const { user } = useUser();

  const [likes, setIsLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [optimisticState, addOptimistic] = useOptimistic<AA, AA>(
    { likes, isLiked },
    (_currentState, newState) => {
      return newState;
    }
  );

  const handleClick = () => {
    startTransition(async () => {
      // 楽観的更新を行う
      addOptimistic({
        likes: optimisticState.isLiked
          ? optimisticState.likes - 1
          : optimisticState.likes + 1,
        isLiked: !optimisticState.isLiked,
      });
      // APIリクエストを送信する
      try {
        const favorite = await getUserFavoriteForBook(bookId);
        console.log(favorite);

        await deleteFavorite(bookId);
      } catch {
        await createFavorite({ bookId });
      }
      // APIリクエストが成功した場合のみ真の状態を更新する
      setIsLikes(optimisticState.likes + (optimisticState.isLiked ? -1 : 1));
      setIsLiked(!optimisticState.isLiked);
    });
  };

  const { data: favoriteCounts } = useQuery({
    queryKey: queryKeys.book.favoriteCounts(bookId),
    queryFn: () => getBookFavoriteCounts(bookId),
  });

  // const {
  //   mutate: toggleMutation,
  //   variables,
  //   isPending,
  // } = useMutation({
  //   mutationFn: async (newFavorite: Favorite | undefined) => {
  //     if (newFavorite) {
  //       const requestBody: FavoriteRequest = { bookId };
  //       await createFavorite(requestBody);
  //     } else {
  //       await deleteFavorite(bookId);
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: queryKeys.user.favoriteForBook(bookId),
  //     });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  // const handleClick = () => {
  //   if (!user) return;

  //   const newFavorite = favorite ? undefined : favorite;
  //   toggleMutation(newFavorite);
  // };

  // const optimisticData = isPending ? variables : favorite;

  return (
    <div className="text-muted-foreground flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'text-muted-foreground rounded-full',
              BUTTON_SIZE[size],
              optimisticState.isLiked && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            aria-label={
              optimisticState.isLiked
                ? 'お気に入りから削除'
                : 'お気に入りに追加'
            }
            onClick={handleClick}
          >
            <HeartIcon
              className={cn(
                ICON_SIZE[size],
                optimisticState.isLiked && 'fill-primary'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {user
            ? optimisticState.isLiked
              ? 'お気に入りから削除'
              : 'お気に入りに追加'
            : 'ログインしてこの本を「お気に入り」に加えましょう'}
        </TooltipContent>
      </Tooltip>

      {showCount && (
        <div className={cn('flex min-w-4 justify-center', TEXT_SIZE[size])}>
          {favoriteCounts?.favoriteCount}
        </div>
      )}
    </div>
  );
}
