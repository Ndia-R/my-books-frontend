import BookCard from '@/components/book-list/book-card';
import BookListEmpty from '@/components/book-list/book-list-empty';
import { Book } from '@/types/book';

type Props = {
  books: Book[];
};

export default function BookList({ books }: Props) {
  if (!books.length) return <BookListEmpty />;

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
