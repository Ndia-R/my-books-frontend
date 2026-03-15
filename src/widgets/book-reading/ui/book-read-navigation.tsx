import { usePrefetchBook, type BookToc } from '@/entities/book';
import { buildPath } from '@/shared/api/url-builder';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router';

type Props = {
  bookToc: BookToc;
  chapterNumber: number;
  pageNumber: number;
  isPreviewMode?: boolean;
};

export default function BookReadNavigation({
  bookToc,
  chapterNumber,
  pageNumber,
  isPreviewMode = false,
}: Props) {
  const { bookId, isFirstPage, isLastPage, next, prev } = getPageNavigation(
    bookToc,
    chapterNumber,
    pageNumber
  );

  const { prefetchBookReadContent, prefetchBookReadPreview } =
    usePrefetchBook();

  useEffect(() => {
    if (!isLastPage) {
      if (isPreviewMode) {
        prefetchBookReadPreview(bookId, next.chapter, next.page);
      } else {
        prefetchBookReadContent(bookId, next.chapter, next.page);
      }
    }
  }, [
    bookId,
    isLastPage,
    next.chapter,
    next.page,
    isPreviewMode,
    prefetchBookReadContent,
    prefetchBookReadPreview,
  ]);

  const pathTemplate = isPreviewMode
    ? '/read-preview/:bookId/chapter/:chapterNumber/page/:pageNumber'
    : '/read-content/:bookId/chapter/:chapterNumber/page/:pageNumber';

  const prevPagePath = buildPath(pathTemplate, {
    bookId,
    chapterNumber: prev.chapter,
    pageNumber: prev.page,
  });

  const nextPagePath = buildPath(pathTemplate, {
    bookId,
    chapterNumber: next.chapter,
    pageNumber: next.page,
  });

  return (
    <div className="flex justify-between">
      <Link
        className={cn(
          'flex items-center gap-x-2',
          isFirstPage && 'pointer-events-none opacity-50',
          buttonVariants({ variant: 'ghost' })
        )}
        to={prevPagePath}
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
        to={nextPagePath}
      >
        <span>次のページへ</span>
        <ChevronRightIcon />
      </Link>
    </div>
  );
}

/**
 * 書籍の目次情報から前後ページのナビゲーション情報を計算
 */
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
