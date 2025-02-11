import { getBookById, getBookContentPage, getBookTableOfContents } from '@/lib/data';
import { useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
};

export default function BookReading({ bookId, chapterNumber, pageNumber }: Props) {
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

  console.log(pageNumber);
  console.log(bookTableOfContents);
  console.log(bookContentPage);

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 -z-10 flex h-screen w-full justify-center">
        <img
          className="w-full max-w-7xl object-cover opacity-30"
          src={book.imageUrl}
          alt="bg-image"
        />
      </div>
      <div className="flex flex-col gap-y-4 px-4 py-8 drop-shadow-lg [text-shadow:1px_1px_1px_hsl(var(--background))/20] sm:px-20">
        <p className="text-3xl font-bold">{book.title}</p>
        <p className="whitespace-pre-wrap">{bookContentPage.content}</p>
      </div>
    </div>
  );
}
