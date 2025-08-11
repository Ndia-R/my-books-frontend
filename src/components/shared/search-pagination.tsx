// import Pagination from '@/components/shared/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

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

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function SearchPagination({ currentPage, totalPages }: Props) {
  const [searchParams] = useSearchParams();

  const pageNumbers = useMemo(() => {
    return createPageNumbers(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const createPageQuery = useCallback(
    (page: number) => {
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      return params.toString();
    },
    [totalPages, searchParams]
  );

  if (totalPages <= 0) return;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`?${createPageQuery(currentPage - 1)}`}
            disabled={currentPage - 1 < 1}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`${pageNumber}-${index}`}>
            {pageNumber ? (
              <PaginationLink
                className={cn(
                  currentPage === pageNumber &&
                    'bg-primary dark:bg-primary hover:bg-primary hover:dark:bg-primary text-primary-foreground hover:text-primary-foreground'
                )}
                to={`?${createPageQuery(pageNumber)}`}
              >
                {pageNumber}
              </PaginationLink>
            ) : (
              <PaginationEllipsis className="text-muted-foreground/50" />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            to={`?${createPageQuery(currentPage + 1)}`}
            disabled={currentPage + 1 > totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
