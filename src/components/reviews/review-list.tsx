import ReviewItem from '@/components/reviews/review-item';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/types';

type Props = {
  reviews: Review[];
  bookId: string;
  page: number;
};

export default function ReviewList({ reviews, bookId, page }: Props) {
  return (
    <ul className="flex flex-col p-3 sm:p-6">
      {reviews.map((review) => (
        <li key={review.userId}>
          <Separator className="bg-foreground/10" />
          <ReviewItem review={review} bookId={bookId} page={page} />
        </li>
      ))}
    </ul>
  );
}
