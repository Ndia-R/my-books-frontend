import { Button } from '@/components/ui/button';
import { useApiGenre } from '@/hooks/api/use-api-genre';
import { cn } from '@/lib/util';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';

type Props = {
  activeIds: number[];
  onClick: (genreId: number) => void;
};

export default function GenreListSelector({ activeIds, onClick }: Props) {
  const { getGenres } = useApiGenre();

  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

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
