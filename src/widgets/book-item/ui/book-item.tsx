import type { Book } from '@/entities/book/model/types';
import AverageRatingIcon from '@/entities/book/ui/average-rating-icon';
import ReviewCountIcon from '@/entities/book/ui/review-count-icon';
import usePrefetch from '@/hooks/use-prefetch';
import { buildPath } from '@/shared/api/url-builder';
import { BOOK_IMAGE_BASE_URL } from '@/shared/config/constants';
import { formatDateJP } from '@/shared/lib/format';
import { Card, CardContent } from '@/shared/ui/card';
import { Link } from 'react-router';

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props) {
  const { prefetchBookDetail } = usePrefetch();

  const handlePrefetch = async () => {
    await prefetchBookDetail(book.id);
  };

  const bookDetailPath = buildPath('/books/:bookId', { bookId: book.id });

  return (
    <Card className="px-2 py-3 sm:px-3 sm:py-4">
      <CardContent className="flex w-38 flex-col items-center gap-y-0 p-0 sm:w-44">
        <Link
          className="size-fit"
          to={bookDetailPath}
          aria-label={`${book.title}の詳細ページへ移動`}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
        >
          <img
            className="mb-1 h-44 rounded-xs object-cover sm:mb-0 sm:h-52"
            src={BOOK_IMAGE_BASE_URL + book.imagePath}
            alt={book.title}
          />
        </Link>
        <Link
          className="hover:text-primary flex h-10 items-center justify-center text-sm font-semibold sm:h-12 sm:text-base"
          to={bookDetailPath}
          aria-label={`${book.title}の詳細ページへ移動`}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
        >
          <h2 className="line-clamp-2 text-center">{book.title}</h2>
        </Link>
        <time
          className="text-muted-foreground text-sm"
          dateTime={
            Date.parse(book.publicationDate) ? book.publicationDate : ''
          }
        >
          {formatDateJP(book.publicationDate)}
        </time>
        <div className="flex gap-x-3">
          <AverageRatingIcon averageRating={book.averageRating} />
          <ReviewCountIcon count={book.reviewCount} />
        </div>
      </CardContent>
    </Card>
  );
}
