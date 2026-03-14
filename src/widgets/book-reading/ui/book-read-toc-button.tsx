import { buildPath } from '@/shared/api/url-builder';
import usePrefetch from '@/shared/hooks/use-prefetch';
import { buttonVariants } from '@/shared/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { TableOfContentsIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookReadTocButton({ bookId }: Props) {
  const { prefetchBookToc } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookToc(bookId);
  };

  const bookTocPath = buildPath('/books/:bookId/table-of-contents', { bookId });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })}
          to={bookTocPath}
          aria-label="目次に戻る"
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
        >
          <TableOfContentsIcon />
        </Link>
      </TooltipTrigger>
      <TooltipContent>目次に戻る</TooltipContent>
    </Tooltip>
  );
}
