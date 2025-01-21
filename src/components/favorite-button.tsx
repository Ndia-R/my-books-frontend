import CountUpNumber from '@/components/count-up-number';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { addFavorite, removeFavorite } from '@/lib/action';
import { getFavoriteCount, getFavoriteState } from '@/lib/data';
import { cn } from '@/lib/util';
import { HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const BUTTON_SIZE = {
  sm: 'size-6',
  md: 'size-8',
  lg: '',
};
const ICON_SIZE = {
  sm: 'size-3',
  md: 'size-4',
  lg: '',
};

type Props = {
  bookId: string;
  size?: 'sm' | 'md' | 'lg';
  withCount?: boolean;
};

export default function FavoriteButton({
  bookId,
  size = 'md',
  withCount = false,
}: Props) {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const favoriteCount = await getFavoriteCount(bookId);
      setCount(favoriteCount);

      if (!user) return;

      const isFavorite = await getFavoriteState(bookId);
      setIsFavorite(isFavorite);
    };
    init();
  }, [bookId, user]);

  const handleClick = async () => {
    if (!user) return;

    if (isFavorite) {
      setCount(count - 1);
      setIsFavorite(false);
      await removeFavorite(bookId);
    } else {
      setCount(count + 1);
      setIsFavorite(true);
      await addFavorite(bookId);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'rounded-full text-muted-foreground',
              BUTTON_SIZE[size],
              isFavorite && 'text-primary bg-transparent'
            )}
            variant="ghost"
            size="icon"
            onClick={handleClick}
          >
            <HeartIcon
              className={ICON_SIZE[size]}
              style={{
                fill: isFavorite ? 'hsl(var(--primary))' : '',
              }}
            />
          </Button>
        </TooltipTrigger>
        {user ? (
          <TooltipContent>
            {isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
          </TooltipContent>
        ) : (
          <TooltipContent>
            ログインしてこの本を「お気に入り」に加えましょう
          </TooltipContent>
        )}
      </Tooltip>

      {withCount && (
        <p className="flex min-w-6 text-sm text-muted-foreground">
          <CountUpNumber end={count} />
        </p>
      )}
    </>
  );
}
