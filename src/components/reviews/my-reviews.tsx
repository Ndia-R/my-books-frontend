import MyReviewList from '@/components/reviews/my-review-list';
import SearchPagination from '@/components/search-pagination';
import { queryKeys } from '@/constants/query-keys';
import { getUserReviews } from '@/lib/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function MyReviews({ page }: Props) {
  const { data: reviewPage } = useSuspenseQuery({
    queryKey: queryKeys.user.reviews(page),
    queryFn: () => getUserReviews(page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {reviewPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <MyReviewList reviews={reviewPage.reviews} />
      <SearchPagination totalPages={reviewPage.totalPages} />
    </div>
  );
}
