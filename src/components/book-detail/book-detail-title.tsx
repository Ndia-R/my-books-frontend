import { Book } from '@/types/book';

type Props = {
  book: Book;
};

export default function BookDetailTitle({ book }: Props) {
  return (
    <>
      <p className="text-3xl font-bold sm:text-4xl">{book.title}</p>
      <div className="flex w-full items-center justify-end">
        <p className="min-w-fit">著者：</p>
        <div className="flex flex-wrap gap-x-3">
          {book.authors ? (
            book.authors.map((author, index) => (
              <p className="text-lg font-bold sm:text-2xl" key={index}>
                {author}
              </p>
            ))
          ) : (
            <p>----</p>
          )}
        </div>
      </div>
    </>
  );
}
