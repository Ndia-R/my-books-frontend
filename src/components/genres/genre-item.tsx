import { Button } from '@/components/ui/button';
import usePrefetch from '@/hooks/use-prefetch';
import { cn } from '@/lib/utils';
import { Genre } from '@/types';
import { Link } from 'react-router';

type Props = {
  genre: Genre;
  isActive?: boolean;
  onClick?: (genreId: number) => void;
};

export default function GenreItem({ genre, isActive = false, onClick }: Props) {
  const { prefetchBookDiscover } = usePrefetch();

  const handlePrefetch = () => {
    prefetchBookDiscover(String(genre.id), 'SINGLE');
  };

  const buttonProps = {
    className: cn(
      isActive &&
        'bg-primary dark:bg-primary hover:bg-primary hover:dark:bg-primary text-primary-foreground hover:text-primary-foreground'
    ),
    variant: 'ghost' as const,
    size: 'sm' as const,
  };

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
        to={`/discover?genreIds=${genre.id}&condition=SINGLE`}
        aria-label={`${genre.name}のジャンルページへ移動`}
      >
        {genre.name}
      </Link>
    </Button>
  );
}
