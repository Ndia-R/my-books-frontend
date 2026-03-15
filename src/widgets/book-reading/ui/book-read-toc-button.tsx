import { usePrefetchBook } from '@/entities/book';
import { buildPath } from '@/shared/lib/url-builder';
import { buttonVariants } from '@/shared/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { TableOfContentsIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookReadTocButton({ bookId }: Props) {
  const { prefetchBookToc } = usePrefetchBook();

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
