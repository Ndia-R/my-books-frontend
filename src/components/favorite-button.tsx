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
  const buttonSize = size === 'sm' ? 'size-6' : size === 'md' ? 'size-8' : '';
  const iconSize = size === 'sm' ? 'size-3' : size === 'md' ? 'size-4' : '';

  // const isFavorite = !book.isFavorite;
  const isFavorite = false;
  return (
    <div className={className}>
      <Button
        className={cn(
          buttonSize,
          'rounded-full text-muted-foreground',
          isFavorite && 'text-primary bg-primary/20'
        )}
        variant="ghost"
        size="icon"
      >
        <HeartIcon
          className={iconSize}
          style={{ fill: isFavorite ? 'hsl(var(--primary))' : '' }}
        />
      </Button>
    </div>
  );
}
