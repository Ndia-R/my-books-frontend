import { buttonVariants } from '@/components/ui/button';
import usePrefetch from '@/hooks/use-prefetch';
import { cn } from '@/lib/utils';
import { BookToc } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router';

const getPageNavigation = (toc: BookToc, chapter: number, page: number) => {
  const chapters = toc.chapters;
  const currentChapter = chapters.find((c) => c.chapterNumber === chapter);

  if (!currentChapter) {
    return {
      bookId: toc.bookId,
      isFirstPage: false,
      isLastPage: false,
      next: { chapter, page },
      prev: { chapter, page },
    };
  }

  const chapterIdx = chapters.indexOf(currentChapter);
  const isFirstPage = chapter === 1 && page === 1;
  const isLastPage =
    chapterIdx === chapters.length - 1 && page === currentChapter.totalPages;

  // 次ページ計算
  let next = { chapter, page };
  if (page < currentChapter.totalPages) {
    next = { chapter, page: page + 1 };
  } else if (chapterIdx < chapters.length - 1) {
    next = { chapter: chapter + 1, page: 1 };
  }

  // 前ページ計算
  let prev = { chapter, page };
  if (page > 1) {
    prev = { chapter, page: page - 1 };
  } else if (chapterIdx > 0) {
    prev = { chapter: chapter - 1, page: chapters[chapterIdx - 1].totalPages };
  }

  return {
    bookId: toc.bookId,
    isFirstPage,
    isLastPage,
    next,
    prev,
  };
};

type Props = {
  bookToc: BookToc;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookReadNavigation({
  bookToc,
  chapterNumber,
  pageNumber,
}: Props) {
  const { bookId, isFirstPage, isLastPage, next, prev } = getPageNavigation(
    bookToc,
    chapterNumber,
    pageNumber
  );

  const { prefetchBookReadContent } = usePrefetch();

  useEffect(() => {
    if (!isLastPage) {
      prefetchBookReadContent(bookId, next.chapter, next.page);
    }
  }, [bookId, isLastPage, next.chapter, next.page, prefetchBookReadContent]);

  return (
    <div className="flex justify-between">
      <Link
        className={cn(
          'flex items-center gap-x-2',
          isFirstPage && 'pointer-events-none opacity-50',
          buttonVariants({ variant: 'ghost' })
        )}
        to={`/read/${bookId}/chapter/${prev.chapter}/page/${prev.page}`}
      >
        <ChevronLeftIcon />
        <span>前のページへ</span>
      </Link>

      <Link
        className={cn(
          'flex items-center gap-x-2',
          isLastPage && 'pointer-events-none opacity-50',
          buttonVariants({ variant: 'ghost' })
        )}
        to={`/read/${bookId}/chapter/${next.chapter}/page/${next.page}`}
      >
        <span>次のページへ</span>
        <ChevronRightIcon />
      </Link>
    </div>
  );
}
