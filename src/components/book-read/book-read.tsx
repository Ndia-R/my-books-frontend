import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQueries } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookRead({ bookId, chapterNumber, pageNumber }: Props) {
  const { getBookDetailsById, getBookTableOfContents, getBookContentPage } = useApiBook();

  const [{ data: book }, { data: bookTableOfContents }, { data: bookContentPage }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: ['getBookDetailsById', bookId],
          queryFn: () => getBookDetailsById(bookId),
        },
        {
          queryKey: ['getBookTableOfContents', bookId],
          queryFn: () => getBookTableOfContents(bookId),
        },
        {
          queryKey: ['getBookContentPage', bookId, chapterNumber, pageNumber],
          queryFn: () => getBookContentPage(bookId, chapterNumber, pageNumber),
        },
      ],
    });

  const totalPage = bookTableOfContents.chapters.find(
    (chapter) => chapter.chapterNumber === chapterNumber
  )?.pageNumbers.length;
  const pageTitle = `（${pageNumber}/${totalPage}）`;

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 flex h-screen w-full justify-center">
        <img
          className="w-full max-w-7xl object-cover opacity-5"
          src={book.imageUrl}
          alt="bg-image"
        />
      </div>
      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex items-center gap-x-2">
          <p className="text-xl font-bold sm:text-2xl">
            {bookContentPage.chapterTitle}
            <span className="text-sm text-muted-foreground sm:text-base">
              {pageTitle}
            </span>
            <BookmarkIcon className="inline size-4" />
          </p>
        </div>
        <p className="whitespace-pre-wrap">{bookContentPage.content}</p>
      </div>
    </>
  );
}
