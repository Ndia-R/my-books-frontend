import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Genre } from '@/types';
import { CheckIcon } from 'lucide-react';

type Props = {
  genres: Genre[];
  activeIds: number[];
  onClick: (genreId: number) => void;
};

export default function GenreListSelector({ genres, activeIds, onClick }: Props) {
  return (
    <ul className="flex flex-wrap">
      {genres.map((genre) => {
        const isActive = activeIds.includes(genre.id);
        return (
          <li key={genre.id}>
            <Button
              className={cn(
                'rounded-full m-1 text-muted-foreground text-xs sm:text-sm',
                isActive && 'text-foreground'
              )}
              variant={isActive ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onClick(genre.id)}
            >
              {isActive && <CheckIcon className="mr-1 size-4" strokeWidth={4} />}
              {genre.name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
