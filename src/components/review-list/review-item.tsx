import Rating from '@/components/rating';
import { formatDate } from '@/lib/util';
import { Review } from '@/types/book';

type Props = {
  review: Review;
  className?: string;
};

export default function ReviewItem({ review, className }: Props) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
        <div className="flex items-center gap-x-4">
          <img
            className="w-16 rounded-full"
            src={review.avatarUrl}
            alt={review.avatarUrl}
          />
          <div>
            <p className="text-lg font-semibold">{review.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(review.updatedAt)}
            </p>
          </div>
        </div>
        <Rating className="mx-4" rating={review.rating} readOnly />
      </div>
      <p className="p-4 text-muted-foreground">{review.comment}</p>
    </div>
  );
}
