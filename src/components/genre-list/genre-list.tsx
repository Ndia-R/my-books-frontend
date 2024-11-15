import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Genre } from '@/types/book';
import { Link } from 'react-router-dom';

type Props = {
  genres: Genre[];
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function GenreList({ genres, className, variant = 'default' }: Props) {
  return (
    <ul className={cn('flex flex-wrap', className)}>
      {genres.map((genre) => (
        <li key={genre.id}>
          <Link to={`/discover?genreId=${genre.id}`}>
            <Button className="rounded-full" variant={variant} size="sm">
              {genre.name}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
