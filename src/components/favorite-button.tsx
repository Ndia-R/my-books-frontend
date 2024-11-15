import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Book } from '@/types/book';
import { HeartIcon } from 'lucide-react';

type Props = {
  book: Book;
};

export default function FavoriteButton({ book }: Props) {
  const isFavorite = !book.isFavorite;
  return (
    <>
      <Button
        className={cn(
          'size-8 rounded-full text-muted-foreground',
          isFavorite && 'text-primary bg-primary/20'
        )}
        variant="ghost"
        size="icon"
      >
        <HeartIcon className="size-4" />
      </Button>
    </>
  );
}
