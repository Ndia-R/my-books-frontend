import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Book } from '@/types/book';
import { HeartIcon } from 'lucide-react';

type Props = {
  book: Book;
  className: string;
};

export default function FavoriteButton({ className, book }: Props) {
  // const isFavorite = !book.isFavorite;
  const isFavorite = false;
  return (
    <div className={className}>
      <Button
        className={cn(
          'size-8 rounded-full text-muted-foreground',
          isFavorite && 'text-primary bg-primary/20'
        )}
        variant="ghost"
        size="icon"
      >
        <HeartIcon
          className="size-4"
          style={{ fill: isFavorite ? 'hsl(var(--primary))' : '' }}
        />
      </Button>
    </div>
  );
}
