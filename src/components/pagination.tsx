import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HTMLAttributes } from 'react';

const createPageNumbers = (page: number, total: number) => {
  const pages = [];
  const maxPages = 7;

  if (page <= 4) {
    for (let i = 1; i <= Math.min(5, total); i++) {
      pages.push(i);
    }
    if (total > 5) {
      pages.push(0, total);
    }
  } else if (page >= total - 3) {
    pages.push(1, 0);
    for (let i = total - 4; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, 0);
    for (let i = page - 1; i <= page + 1; i++) {
      pages.push(i);
    }
    pages.push(0, total);
  }

  return pages.slice(0, maxPages);
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  total: number;
  page: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({
  total,
  page,
  onChangePage,
  className,
  ...props
}: Props) {
  const pageNumbers = createPageNumbers(page, total);

  return (
    <div className={cn('flex', className)} {...props}>
      <Button
        className="size-8 rounded-full"
        variant="ghost"
        size="icon"
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
      >
        <ChevronLeft className="size-5" />
      </Button>

      <ul className="flex">
        {pageNumbers.map((pageNumber, index) => (
          <li key={`${pageNumber}-${index}`}>
            {pageNumber === 0 ? (
              <div className="size-8 text-center">...</div>
            ) : (
              <Button
                className="size-8 rounded-full"
                variant={page === pageNumber ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => {
                  if (page !== pageNumber) {
                    onChangePage(pageNumber);
                  }
                }}
              >
                {pageNumber}
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Button
        className="size-8 rounded-full"
        variant="ghost"
        size="icon"
        disabled={page >= total}
        onClick={() => onChangePage(page + 1)}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
