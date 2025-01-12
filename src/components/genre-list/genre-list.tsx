import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import { Button } from '@/components/ui/button';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getGenres } from '@/lib/data';
import { cn } from '@/lib/util';
import { Genre } from '@/types/book';
import { useCallback } from 'react';
import { Await, Link } from 'react-router-dom';

type Props = {
  className?: string;
  filterList?: number[];
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function GenreList({
  className,
  filterList = [],
  variant = 'default',
}: Props) {
  const fetcher = useCallback(() => getGenres(), []);

  const { data: genres } = useFetchData({ fetcher });

  return (
    <Await resolve={genres}>
      {(genres: Genre[]) => {
        if (!genres) return <GenreListSkeleton />;
        const filteredGenres =
          filterList.length === 0
            ? genres
            : genres.filter((genre) => filterList.includes(genre.id));
        return (
          <ul className={cn('flex flex-wrap', className)}>
            {filteredGenres.map((genre) => (
              <li key={genre.id}>
                <Button
                  className={cn(
                    'rounded-full',
                    variant === 'outline' && 'bg-transparent'
                  )}
                  variant={variant}
                  size="sm"
                  asChild
                >
                  <Link to={`/discover?genreId=${genre.id}`}>{genre.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        );
      }}
    </Await>
  );
}
