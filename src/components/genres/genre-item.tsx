import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { Genre } from '@/types';
import { CheckIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleClick = () => {
    if (onClick) {
      onClick(genre.id);
    } else {
      navigate(`/discover?genreIds=${genre.id}&condition=SINGLE`);
    }
  };

  return (
    <Button
      className={cn(
        'rounded-full m-1 text-muted-foreground text-xs sm:text-sm',
        isActive && 'text-foreground',
        variant === 'outline' && 'bg-transparent text-primary'
      )}
      variant={isActive ? 'secondary' : variant}
      size="sm"
      onClick={handleClick}
    >
      {isActive && <CheckIcon className="mr-1 size-4" strokeWidth={4} />}
      {genre.name}
    </Button>
  );
}
