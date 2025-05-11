import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HTMLAttributes } from 'react';

/**
 * ページネーションのためのページ番号リストを作成する
 * createPageNumbers(1, 1);  // [1]
 * createPageNumbers(2, 3);  // [1, 2, 3]
 * createPageNumbers(3, 5);  // [1, 2, 3, 4, 5]
 * createPageNumbers(1, 7);  // [1, 2, 3, 4, 5, 6, 7]
 * createPageNumbers(1, 10); // [1, 2, 3, 4, 5, 0, 10]
 * createPageNumbers(3, 10); // [1, 2, 3, 4, 5, 0, 10]
 * createPageNumbers(5, 10); // [1, 0, 4, 5, 6, 0, 10]
 * createPageNumbers(6, 10); // [1, 0, 5, 6, 7, 0, 10]
 * createPageNumbers(9, 10); // [1, 0, 6, 7, 8, 9, 10]
 * createPageNumbers(7, 15); // [1, 0, 6, 7, 8, 0, 15]
 */
const createPageNumbers = (page: number, total: number) => {
  // ページ数が7以下なら全て表示
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: number[] = [];

  pages.push(1); // 最初のページは常に表示

  if (page <= 4) {
    // 現在ページが前方（1〜4）の場合
    pages.push(2, 3, 4, 5);
    pages.push(0); // 省略
  } else if (page >= total - 3) {
    // 現在ページが後方（total-3〜total）の場合
    pages.push(0); // 省略
    pages.push(total - 4, total - 3, total - 2, total - 1);
  } else {
    // 現在ページが中間の場合
    pages.push(0); // 前省略
    pages.push(page - 1, page, page + 1);
    pages.push(0); // 後省略
  }

  pages.push(total); // 最後のページは常に表示

  return pages;
};

type Props = HTMLAttributes<HTMLDivElement> & {
  total: number;
  page: number;
  onChangePage: (page: number) => void;
};

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
        aria-label="前のページへ"
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
                aria-label="ページ番号"
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
        aria-label="次のページへ"
        disabled={page >= total}
        onClick={() => onChangePage(page + 1)}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
