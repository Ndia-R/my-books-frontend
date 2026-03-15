import type { Book } from '@/entities/book/model/types';
import BookItem from '@/entities/book/ui/book-item';

type Props = {
  books: Book[];
  onItemPrefetch?: (book: Book) => void;
};

export default function BookList({ books, onItemPrefetch }: Props) {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <article key={book.id}>
          <BookItem
            book={book}
            onPrefetch={onItemPrefetch ? () => onItemPrefetch(book) : undefined}
          />
        </article>
      ))}
    </div>
  );
}
