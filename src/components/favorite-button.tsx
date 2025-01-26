import CountUpNumber from '@/components/count-up-number';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { addFavorite, removeFavorite } from '@/lib/action';
import { getFavoriteInfo, getFavoriteInfoWithAuth } from '@/lib/data';
import { cn } from '@/lib/util';
import { FavoriteInfo } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type Props = {
  bookId: string;
  size?: 'sm' | 'md';
  animation?: boolean;
};

export default function FavoriteButton({
  bookId,
  size = 'md',
  animation = false,
}: Props) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const queryKey = ['getFavoriteInfo', bookId];
  const { data: favoriteInfo } = useQuery({
    queryKey,
    queryFn: () => (user ? getFavoriteInfoWithAuth(bookId) : getFavoriteInfo(bookId)),
  });

  const { mutate, variables, isPending } = useMutation({
    mutationFn: async (newFavoriteInfo: FavoriteInfo) => {
      if (newFavoriteInfo.isFavorite) {
        await addFavorite(bookId);
      } else {
        await removeFavorite(bookId);
      }
    },
    onMutate: async (newFavoriteInfo: FavoriteInfo) => {
      await queryClient.cancelQueries({ queryKey });
      const previousFavoriteInfo = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newFavoriteInfo);
      return { previousFavoriteInfo };
    },
    onSettled: (_newFavoriteInfo, error, _variables, context) => {
      if (error) {
        queryClient.setQueryData(queryKey, context?.previousFavoriteInfo);
      }
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleClick = () => {
    if (!user || !favoriteInfo) return;

    const newFavoriteInfo: FavoriteInfo = {
      ...favoriteInfo,
      isFavorite: !favoriteInfo.isFavorite,
      favoriteCount: favoriteInfo.isFavorite
        ? favoriteInfo.favoriteCount - 1
        : favoriteInfo.favoriteCount + 1,
    };
    mutate(newFavoriteInfo);
  };

  const optimisticData = isPending ? variables : favoriteInfo;

  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'rounded-full text-muted-foreground',
              BUTTON_SIZE[size],
              optimisticData?.isFavorite && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            onClick={handleClick}
          >
            <HeartIcon
              className={ICON_SIZE[size]}
              style={{
                fill: optimisticData?.isFavorite ? 'hsl(var(--primary))' : '',
              }}
            />
          </Button>
        </TooltipTrigger>
        {user ? (
          <TooltipContent>
            {optimisticData?.isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
          </TooltipContent>
        ) : (
          <TooltipContent>
            ログインしてこの本を「お気に入り」に加えましょう
          </TooltipContent>
        )}
      </Tooltip>

      <p
        className={cn(
          'flex min-w-4 text-muted-foreground justify-center',
          TEXT_SIZE[size]
        )}
      >
        {animation ? (
          <CountUpNumber end={optimisticData?.favoriteCount || 0} />
        ) : (
          optimisticData?.favoriteCount
        )}
      </p>
    </div>
  );
}
