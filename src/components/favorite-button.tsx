import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Book } from '@/types/book';
import { HeartIcon } from 'lucide-react';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  book: Book;
};

export default function FavoriteButton({ className, size = 'md', book }: Props) {
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

  // const isFavorite = !book.isFavorite;
  const isFavorite = false;
  return (
    <div className={className}>
      <Button
        className={cn(
          'rounded-full text-muted-foreground',
          BUTTON_SIZE[size],
          isFavorite && 'text-primary bg-primary/20'
        )}
        variant="ghost"
        size="icon"
      >
        <HeartIcon
          className={ICON_SIZE[size]}
          style={{ fill: isFavorite ? 'hsl(var(--primary))' : '' }}
        />
      </Button>
    </div>
  );
}
