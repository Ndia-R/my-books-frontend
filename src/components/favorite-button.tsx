import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { addFavorite, removeFavorite } from '@/lib/action';
import { getFavoriteState } from '@/lib/data';
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
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  bookId: string;
};

export default function FavoriteButton({ className, size = 'md', bookId }: Props) {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const init = async () => {
      const favoriteState = await getFavoriteState(bookId);
      if (favoriteState) {
        setIsFavorite(favoriteState?.isFavorite);
      }
    };
    init();
  }, []);

  const handleClick = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      await removeFavorite(bookId);
    } else {
      setIsFavorite(true);
      await addFavorite(bookId);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            <Button
              className={cn(
                'rounded-full text-muted-foreground',
                BUTTON_SIZE[size],
                isFavorite && 'text-primary bg-transparent'
              )}
              variant="ghost"
              size="icon"
              onClick={user ? handleClick : undefined}
            >
              <HeartIcon
                className={ICON_SIZE[size]}
                style={{
                  fill: isFavorite ? 'hsl(var(--primary))' : '',
                }}
              />
            </Button>
          </div>
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
    </>
  );
}
