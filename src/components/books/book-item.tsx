import AverageRatingIcon from '@/components/count-icon/average-rating-icon';
import ReviewCountIcon from '@/components/count-icon/review-count-icon';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { formatDateJP } from '@/lib/util';
import { Book } from '@/types';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props) {
  return (
    <Card className="border-card-foreground/5 bg-card/70">
      <CardContent className="relative flex w-40 flex-col items-center px-3 pb-2 pt-4 sm:w-48 sm:px-4">
        <Link to={`/book/${book.id}`} className="size-fit">
          <img
            className="h-44 rounded object-cover sm:h-52"
            src={BOOK_IMAGE_BASE_URL + book.imagePath}
            alt={book.title}
          />
        </Link>
        <Link
          to={`/book/${book.id}`}
          className="mt-1 flex h-8 w-full items-center justify-center text-xs hover:text-primary sm:h-10 sm:text-sm"
        >
          <p className="line-clamp-2 text-center">{book.title}</p>
        </Link>
        <div className="mt-1 flex w-full flex-col items-center gap-y-1">
          <p className="text-xs tracking-wide text-muted-foreground">
            {formatDateJP(book.publishedDate)}
          </p>
          <div className="flex gap-x-2">
            <AverageRatingIcon size="sm" averageRating={book.averageRating} />
            <ReviewCountIcon size="sm" reviewCount={book.reviewCount} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
