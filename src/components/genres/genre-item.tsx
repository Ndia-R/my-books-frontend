import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Genre } from '@/types';
import { Link } from 'react-router';

type Props = {
  genre: Genre;
  isActive?: boolean;
  onClick?: (genreId: number) => void;
};

export default function GenreItem({ genre, isActive = false, onClick }: Props) {
  const buttonProps = {
    className: cn(
      'text-xs sm:text-sm',
      isActive &&
        'bg-primary dark:bg-primary hover:bg-primary hover:dark:bg-primary text-primary-foreground hover:text-primary-foreground'
    ),
    variant: isActive ? ('outline' as const) : ('ghost' as const),
    size: 'sm' as const,
  };

  // 基本はLinkとしての振る舞いだが、onClickが指定されていれば、ボタンとして振る舞う
  return onClick ? (
    <Button {...buttonProps} onClick={() => onClick(genre.id)}>
      {genre.name}
    </Button>
  ) : (
    <Button {...buttonProps} asChild>
      <Link to={`/discover?genreIds=${genre.id}&condition=SINGLE`}>
        {genre.name}
      </Link>
    </Button>
  );
}
