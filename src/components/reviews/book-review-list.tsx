import BookReviewItem from '@/components/reviews/book-review-item';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/types';

type Props = {
  reviews: Review[];
};

export default function BookReviewList({ reviews }: Props) {
  return (
    <ul className="flex flex-col p-3 sm:p-6">
      {reviews.map((review) => (
        <li key={review.id}>
          <Separator className="bg-foreground/10" />
          <article className="animate-in fade-in-0 slide-in-from-top-2 fill-mode-both delay-0 duration-500">
            <BookReviewItem review={review} />
          </article>
        </li>
      ))}
    </ul>
  );
}
