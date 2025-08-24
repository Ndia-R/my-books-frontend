import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { APP_TITLE } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import usePrefetch from '@/hooks/use-prefetch';
import { getBookToc } from '@/lib/api/books';
import { chapterNumberString, cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

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

  const handlePrefetch = (bookId: string, chapterNumber: number) => {
    if (isAuthenticated) {
      prefetchBookReadContent(bookId, chapterNumber);
    }
  };

  return (
    <>
      <title>{`${bookToc.title} - ${APP_TITLE}`}</title>

      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex flex-col items-center gap-y-6 sm:items-start">
          <h1 className="text-3xl font-bold sm:text-5xl">
            {bookToc.title}
          </h1>

          {isAuthenticated && bookToc.chapters.length ? (
            <Link
              className={cn(buttonVariants({ variant: 'outline' }), 'w-44')}
              to={`/read/${bookId}/chapter/1/page/1`}
              onMouseEnter={() => handlePrefetch(bookId, 1)}
              onFocus={() => handlePrefetch(bookId, 1)}
            >
              最初から読む
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-44 cursor-default" variant="outline">
                  最初から読む
                </Button>
              </TooltipTrigger>
              {bookToc.chapters.length ? (
                <TooltipContent>
                  ログインしてこの本を読みましょう
                </TooltipContent>
              ) : null}
            </Tooltip>
          )}
        </div>

        {bookToc.chapters.length ? (
          <ul className="flex flex-col gap-y-8">
            {bookToc.chapters.map((chapter) => (
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
                  to={`/read/${bookId}/chapter/${chapter.chapterNumber}/page/1`}
                  aria-label={`${chapter.chapterTitle}のページへ移動`}
                  onMouseEnter={() =>
                    handlePrefetch(bookId, chapter.chapterNumber)
                  }
                  onFocus={() => handlePrefetch(bookId, chapter.chapterNumber)}
                >
                  {chapter.chapterTitle}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center sm:text-start">目次がありません</p>
        )}
      </div>
    </>
  );
}
