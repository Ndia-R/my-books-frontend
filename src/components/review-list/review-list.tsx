import ReviewItem from '@/components/review-list/review-item';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/types/review';

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  return (
    <ul className="flex flex-col p-6">
      {reviews.map((review) => (
        <li key={review.id}>
          <Separator className="bg-foreground/10" />
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
}
