import AverageRatingIcon from '@/components/count-icon/average-rating-icon';
import ReviewCountIcon from '@/components/count-icon/review-count-icon';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { formatDateJP } from '@/lib/utils';
import { Book } from '@/types';
import { Link } from 'react-router';

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props) {
  return (
    <Card className="border-card-foreground/5 bg-card/70 px-2 py-3 sm:px-3 sm:py-4">
      <CardContent className="flex w-38 flex-col items-center gap-y-0 p-0 sm:w-44">
        <Link to={`/book/${book.id}`} className="size-fit">
          <img
            className="mb-1 h-44 rounded-xs object-cover sm:mb-0 sm:h-52"
            src={BOOK_IMAGE_BASE_URL + book.imagePath}
            alt={book.title}
          />
        </Link>
        <Link
          to={`/book/${book.id}`}
          className="hover:text-primary flex h-10 items-center justify-center text-sm font-semibold sm:h-12 sm:text-base"
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
