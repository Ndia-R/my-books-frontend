import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useApiBook } from '@/hooks/api/use-api-book';
import { usePageTitle } from '@/hooks/use-page-title';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

type Props = {
  bookId: string;
};

export default function BookTableOfContents({ bookId }: Props) {
  const { getBookTableOfContents } = useApiBook();
  const { user } = useAuth();

  const { data: bookTableOfContents } = useSuspenseQuery({
    queryKey: ['getBookTableOfContents', bookId],
    queryFn: () => getBookTableOfContents(bookId),
  });

  usePageTitle(bookTableOfContents.title);

  return (
    <div className="animate-in fade-in-0 delay-0 duration-200">
      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex w-full flex-col items-center gap-y-6 sm:items-start">
          <h1 className="text-3xl font-bold sm:text-5xl">
            {bookTableOfContents.title}
          </h1>

          {user && bookTableOfContents.chapters.length ? (
            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-44 rounded-full bg-transparent'
              )}
              to={`/read/${bookId}/chapter/1/page/1`}
            >
              最初から読む
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="hover:border-primary/50 w-44 cursor-default rounded-full bg-transparent opacity-50 hover:bg-transparent"
                  variant="outline"
                >
                  最初から読む
                </Button>
              </TooltipTrigger>
              {bookTableOfContents.chapters.length ? (
                <TooltipContent>
                  ログインしてこの本を読みましょう
                </TooltipContent>
              ) : null}
            </Tooltip>
          )}
        </div>

        {bookTableOfContents.chapters.length ? (
          <ul className="flex w-full flex-col gap-y-8">
            {bookTableOfContents.chapters.map((chapter) => (
              <li
                className="w-full text-center sm:text-left"
                key={chapter.chapterNumber}
              >
                <p className="text-muted-foreground text-xs sm:text-sm">{`第 ${chapter.chapterNumber} 章`}</p>
                <Link
                  to={`/read/${bookId}/chapter/${chapter.chapterNumber}/page/1`}
                  className={cn(
                    'hover:text-primary text-base font-semibold sm:text-xl',
                    !user && 'pointer-events-none'
                  )}
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
    </div>
  );
}
