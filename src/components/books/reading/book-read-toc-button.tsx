import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import usePrefetch from '@/hooks/use-prefetch';
import { TableOfContentsIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookReadTocButton({ bookId }: Props) {
  const { prefetchBookTableOfContents } = usePrefetch();

  const handlePrefetch = () => {
    prefetchBookTableOfContents(bookId);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })}
          to={`/read/${bookId}/table-of-contents`}
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
