import BookCard from '@/components/books/book-card';
import { Book } from '@/types';

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
    <ul className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}
