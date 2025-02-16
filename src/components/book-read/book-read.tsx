import { getBookById, getBookContentPage, getBookTableOfContents } from '@/lib/data';
import { useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookRead({ bookId, chapterNumber, pageNumber }: Props) {
  const [{ data: book }, { data: bookTableOfContents }, { data: bookContentPage }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: ['getBookById', bookId],
          queryFn: () => getBookById(bookId),
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

  const pageTitle = `（${pageNumber}/${bookTableOfContents.chapters.find((chapter) => chapter.chapterNumber === chapterNumber)?.pageNumbers.length}）`;

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
        <p className="text-xl font-bold sm:text-2xl">
          {bookContentPage.chapterTitle}
          <span className="text-sm text-muted-foreground sm:text-base">{pageTitle}</span>
        </p>
        <p className="whitespace-pre-wrap">{bookContentPage.content}</p>
      </div>
    </>
  );
}
