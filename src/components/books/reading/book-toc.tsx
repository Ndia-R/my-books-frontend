import { Button } from '@/components/ui/button';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { getBookToc } from '@/lib/api/books';
import { buildPath, chapterNumberString, cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookToc({ bookId }: Props) {
  const { data: bookToc } = useSuspenseQuery({
    queryKey: queryKeys.getBookToc(bookId),
    queryFn: () => getBookToc(bookId),
  });

  const { isAuthenticated } = useAuth();
  const { prefetchBookReadContent } = usePrefetch();
  const navigate = useNavigate();

  const handlePrefetch = async (bookId: string, chapterNumber: number) => {
    if (isAuthenticated) {
      await prefetchBookReadContent(bookId, chapterNumber);
    }
  };

  const handleClick = () => {
    const firstChapterPath = buildPath(
      isAuthenticated
        ? '/read/:bookId/chapter/:chapterNumber/page/:pageNumber'
        : '/read-preview/:bookId/chapter/:chapterNumber/page/:pageNumber',
      {
        bookId,
        chapterNumber: 1,
        pageNumber: 1,
      }
    );
    navigate(firstChapterPath);
  };

  return (
    <>
      <title>{`${bookToc.title} - ${APP_TITLE}`}</title>

      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex flex-col items-center gap-y-6 sm:items-start">
          <h1 className="text-3xl font-bold sm:text-5xl">{bookToc.title}</h1>
          <Button
            className="w-44"
            disabled={bookToc.chapters.length === 0}
            onClick={handleClick}
            onMouseEnter={() => handlePrefetch(bookId, 1)}
            onFocus={() => handlePrefetch(bookId, 1)}
          >
            {isAuthenticated ? '  最初から読む' : '試し読み'}
          </Button>
        </div>

        {bookToc.chapters.length ? (
          <ul className="flex flex-col gap-y-8">
            {bookToc.chapters.map((chapter) => {
              const chapterPath = buildPath(
                '/read/:bookId/chapter/:chapterNumber/page/:pageNumber',
                {
                  bookId,
                  chapterNumber: chapter.chapterNumber,
                  pageNumber: 1,
                }
              );
              return (
                <li
                  className="flex flex-col items-center sm:items-start"
                  key={chapter.chapterNumber}
                >
                  <p className="text-muted-foreground text-sm">
                    {chapterNumberString(chapter.chapterNumber)}
                  </p>
                  <Link
                    className={cn(
                      'hover:text-primary text-base font-semibold sm:text-xl',
                      !isAuthenticated && 'pointer-events-none'
                    )}
                    to={isAuthenticated ? chapterPath : '#'}
                    aria-label={`${chapter.chapterTitle}のページへ移動`}
                    onMouseEnter={() =>
                      handlePrefetch(bookId, chapter.chapterNumber)
                    }
                    onFocus={() =>
                      handlePrefetch(bookId, chapter.chapterNumber)
                    }
                  >
                    {chapter.chapterTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center sm:text-start">目次がありません</p>
        )}
      </div>
    </>
  );
}
