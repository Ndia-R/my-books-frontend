import MyReviewList from '@/components/my-reviews/my-review-list';
import PaginationUrl from '@/components/pagination-url';
import { useApiRevew } from '@/hooks/api/use-api-review';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function MyReviews({ page }: Props) {
  const { getReviewPageByUser } = useApiRevew();

  const { data: reviewkPage } = useSuspenseQuery({
    queryKey: ['getReviewPageByUser', page],
    queryFn: () => getReviewPageByUser(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {reviewkPage.totalItems}
        <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
      </p>
      <MyReviewList reviews={reviewkPage.reviews} />
      <PaginationUrl totalPages={reviewkPage.totalPages} />
    </div>
  );
}
