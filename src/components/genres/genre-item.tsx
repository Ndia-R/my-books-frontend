import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Genre } from '@/types';
import { useNavigate } from 'react-router';

type Props = {
  genre: Genre;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  isActive?: boolean;
  onClick?: (genreId: number) => void;
};

export default function GenreItem({
  genre,
  variant = 'ghost',
  isActive = false,
  onClick,
}: Props) {
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
        'text-muted-foreground m-1 rounded-full text-xs sm:text-sm',
        isActive && 'text-foreground',
        variant === 'outline' && 'text-primary bg-transparent'
      )}
      variant={isActive ? 'secondary' : variant}
      size="sm"
      onClick={() => handleClick(genre.id)}
    >
      {genre.name}
    </Button>
  );
}
