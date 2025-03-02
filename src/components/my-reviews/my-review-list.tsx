import Rating from '@/components/rating';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateJP, formatTime } from '@/lib/util';
import { Review } from '@/types';
import { Link } from 'react-router-dom';

type Props = {
  reviews: Review[];
};

export default function MyReviewList({ reviews }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {reviews.map((review) => (
        <li key={review.id}>
          <Card>
            <CardContent className="p-4">
              <Link to={`/book/${review.book.id}`} className="flex gap-x-4">
                <div className="flex min-w-20 justify-center sm:min-w-24">
                  <img
                    className="h-24 rounded object-cover sm:h-28"
                    src={review.book.imageUrl}
                    alt={review.book.title}
                  />
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="sm:px-4">
                    <p className="text-base font-semibold sm:text-xl">
                      {review.book.title}
                    </p>
                    <div className="sm:mb-1">
                      <Rating rating={review.rating} readOnly />
                    </div>
                    <p className="whitespace-nowrap text-xs leading-8 tracking-wide text-muted-foreground sm:mb-2 sm:text-sm">
                      {formatDateJP(review.updatedAt)} {formatTime(review.updatedAt)}
                    </p>
                    {review.comment}
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
