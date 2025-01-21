import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Genre } from '@/types';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
  genres: Genre[];
  filterList?: number[];
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function GenreList({
  className,
  genres,
  filterList = [],
  variant = 'default',
}: Props) {
  const filteredGenres =
    filterList.length === 0
      ? genres
      : genres.filter((genre) => filterList.includes(genre.id));

  return (
    <ul className={cn('flex flex-wrap', className)}>
      {filteredGenres.map((genre) => (
        <li key={genre.id}>
          <Button
            className={cn('rounded-full', variant === 'outline' && 'bg-transparent')}
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
}
