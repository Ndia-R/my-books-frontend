import type { Review } from '@/entities/review/model/types';
import { buildPath } from '@/shared/api/url-builder';
import { BOOK_IMAGE_BASE_URL } from '@/shared/config/constants';
import {
  formatDateJP,
  formatRelativeTime,
  formatTime,
} from '@/shared/lib/format';
import { Card, CardContent } from '@/shared/ui/card';
import Rating from '@/shared/ui/rating';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = {
  review: Review;
  action?: ReactNode;
  onPrefetch?: () => void;
};

export default function MyReviewItem({ review, action, onPrefetch }: Props) {
  const bookDetailPath = buildPath('/books/:bookId', {
    bookId: review.book.id,
  });

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex gap-x-4 p-4">
          <div className="flex min-w-20 justify-center sm:min-w-24">
            <Link
              className="size-fit"
              to={bookDetailPath}
              aria-label={`${review.book.title}の詳細ページへ移動`}
              onMouseEnter={onPrefetch}
              onFocus={onPrefetch}
            >
              <img
                className="h-24 rounded-xs object-cover sm:h-28"
                src={BOOK_IMAGE_BASE_URL + review.book.imagePath}
                alt={review.book.title}
              />
            </Link>
          </div>

          <div className="flex w-full flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <Link
                className="size-fit"
                to={bookDetailPath}
                aria-label={`${review.book.title}の詳細ページへ移動`}
                onMouseEnter={onPrefetch}
                onFocus={onPrefetch}
              >
                <h2 className="hover:text-primary text-lg leading-8 font-semibold sm:text-xl">
                  {review.book.title}
                </h2>
              </Link>

              <time
                className="text-muted-foreground mr-1 text-sm"
                dateTime={Date.parse(review.updatedAt) ? review.updatedAt : ''}
                title={`${formatDateJP(review.updatedAt)} ${formatTime(review.updatedAt)}`}
              >
                {formatRelativeTime(review.updatedAt)}
              </time>
            </div>

            <div className="flex flex-row items-center">
              <Rating rating={review.rating} key={review.rating} readOnly />
              {action}
            </div>

            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
