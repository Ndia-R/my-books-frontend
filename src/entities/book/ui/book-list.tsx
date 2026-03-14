import type { Book } from '@/entities/book/model/types';
import BookItem from '@/widgets/book-item/ui/book-item';

type Props = {
  books: Book[];
};

export default function BookList({ books }: Props) {
  if (!books.length) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p>見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <article key={book.id}>
          <BookItem book={book} />
        </article>
      ))}
    </div>
  );
}
