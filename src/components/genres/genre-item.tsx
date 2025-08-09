import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Genre } from '@/types';
import { useNavigate } from 'react-router';

type Props = {
  genre: Genre;
  isActive?: boolean;
  onClick?: (genreId: number) => void;
};

export default function GenreItem({ genre, isActive = false, onClick }: Props) {
  const navigate = useNavigate();

  const handleClick = (genreId: number) => {
    if (onClick) {
      onClick(genreId);
    } else {
      navigate(`/discover?genreIds=${genreId}&condition=SINGLE`);
    }
  };

  return (
    <Button
      className={cn(
        'dark:hover:bg-primary/20 hover:bg-primary/20 text-xs sm:text-sm',
        isActive && 'bg-primary/20 dark:bg-primary/20 text-foreground'
      )}
      variant={isActive ? 'outline' : 'ghost'}
      size="sm"
      onClick={() => handleClick(genre.id)}
    >
      {genre.name}
    </Button>
  );
}
