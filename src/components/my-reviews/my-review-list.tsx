import MyReviewItem from '@/components/my-reviews/my-review-item';
import { Review, ReviewDeleteMutation, ReviewUpdateMutation } from '@/types';

type Props = {
  reviews: Review[];
  updateMutation: ReviewUpdateMutation;
  deleteMutation: ReviewDeleteMutation;
};

export default function MyReviewList({
  reviews,
  updateMutation,
  deleteMutation,
}: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {reviews.map((review) => (
        <li key={review.id}>
          <article>
            <MyReviewItem
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
