import type { Genre } from '@/entities/genre/model/types';
import { cn } from '@/shared/lib/cn';
import { buildQueryString } from '@/shared/lib/url-builder';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router';

type Props = {
  genre: Genre;
  isActive?: boolean;
  onClick?: (genreId: number) => void;
  onPrefetch?: () => void;
};

export default function GenreItem({
  genre,
  isActive = false,
  onClick,
  onPrefetch,
}: Props) {
  const buttonProps = {
    className: cn(
      isActive &&
        'bg-primary dark:bg-primary hover:bg-primary hover:dark:bg-primary text-primary-foreground hover:text-primary-foreground'
    ),
    variant: 'ghost' as const,
    size: 'sm' as const,
  };

  const queryString = buildQueryString({
    genreIds: genre.id,
    condition: 'SINGLE',
  });

  // 基本はLinkとしての振る舞いだが、onClickが指定されていれば、ボタンとして振る舞う
  return onClick ? (
    <Button {...buttonProps} onClick={() => onClick(genre.id)}>
      {genre.name}
    </Button>
  ) : (
    <Button
      {...buttonProps}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      asChild
    >
      <Link
        to={'/discover' + queryString}
        aria-label={`${genre.name}のジャンルページへ移動`}
      >
        {genre.name}
      </Link>
    </Button>
  );
}
