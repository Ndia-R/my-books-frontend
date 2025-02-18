import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Genre } from '@/types';
import { Link } from 'react-router-dom';

type Props = {
  genres: Genre[];
  className?: string;
  filterList?: number[];
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function GenreList({ genres, className, variant = 'default' }: Props) {
  return (
    <ul className={cn('flex flex-wrap', className)}>
      {genres.map((genre) => (
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
