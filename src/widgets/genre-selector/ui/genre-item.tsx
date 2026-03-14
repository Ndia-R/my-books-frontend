import type { Genre } from '@/entities/genre/model/types';
import usePrefetch from '@/hooks/use-prefetch';
import { buildQueryString } from '@/shared/api/url-builder';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router';

type Props = {
  genre: Genre;
  isActive?: boolean;
  onClick?: (genreId: number) => void;
};

export default function GenreItem({ genre, isActive = false, onClick }: Props) {
  const { prefetchBookDiscover } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookDiscover(String(genre.id), 'SINGLE');
  };

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
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
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
