import { Button } from '@/components/ui/button';
import { getBookDetailsById, getBookTableOfContents } from '@/lib/data';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type Props = {
  bookId: string;
};

export default function BookTableOfContents({ bookId }: Props) {
  const [{ data: book }, { data: bookTableOfContents }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['getBookDetailsById', bookId],
        queryFn: () => getBookDetailsById(bookId),
      },
      {
        queryKey: ['getBookTableOfContents', bookId],
        queryFn: () => getBookTableOfContents(bookId),
      },
    ],
  });

  console.log(bookTableOfContents);
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
        <div className="flex w-full flex-col items-center gap-y-4 sm:items-start">
          <p className="text-3xl font-bold sm:text-5xl">{book.title}</p>
          <Button className="w-44 rounded-full bg-transparent" variant="outline" asChild>
            <Link to={`/read/${bookId}/table-of-contents`}>最初から読む</Link>
          </Button>
        </div>
        <ul className="flex w-full flex-col items-center gap-y-8 text-base sm:items-start sm:text-xl">
          {bookTableOfContents.chapters.map((chapter, index) => (
            <li key={chapter.chapterNumber}>
              <p className="text-center text-xs text-muted-foreground/50 sm:text-left sm:text-sm">{`chapter ${index + 1}`}</p>
              <Link
                className="hover:text-primary"
                to={`/read/${bookId}/chapter/${chapter.chapterNumber}/page/1`}
              >
                {chapter.chapterTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
