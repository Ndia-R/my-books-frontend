import ReviewItem from '@/components/reviews/review-item';
import { Separator } from '@/components/ui/separator';
import { Review, ReviewDeleteMutation, ReviewUpdateMutation } from '@/types';

type Props = {
  reviews: Review[];
  updateMutation: ReviewUpdateMutation;
  deleteMutation: ReviewDeleteMutation;
};

export default function ReviewList({
  reviews,
  updateMutation,
  deleteMutation,
}: Props) {
  return (
    <ul className="flex flex-col p-3 sm:p-6">
      {reviews.map((review) => (
        <li key={review.id}>
          <Separator className="bg-foreground/10" />
          <article className="animate-in fade-in-0 slide-in-from-top-2 fill-mode-both delay-0 duration-500">
            <ReviewItem
              review={review}
              updateMutation={updateMutation}
              deleteMutation={deleteMutation}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
