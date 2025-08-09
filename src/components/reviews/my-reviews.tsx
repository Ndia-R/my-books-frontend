import MyReviewList from '@/components/reviews/my-review-list';
import { Button } from '@/components/ui/button';
import { queryKeys } from '@/constants/query-keys';
import { getUserReviews } from '@/lib/api/user';
import { Review } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MyReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: initialReviewPage } = useSuspenseQuery({
    queryKey: queryKeys.user.reviews(1),
    queryFn: () => getUserReviews(1),
  });

  useEffect(() => {
    if (initialReviewPage) {
      setCurrentPage(1);
      setReviews(initialReviewPage.data);
      setTotalPages(initialReviewPage.totalPages);
    }
  }, [initialReviewPage]);

  const loadMoreReviews = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const nextReviewPage = await getUserReviews(nextPage);
    setReviews((prevReviews) => [...prevReviews, ...nextReviewPage.data]);
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {initialReviewPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <MyReviewList reviews={reviews} />

      {currentPage < totalPages && (
        <div className="flex justify-center">
          <Button
            className="text-muted-foreground w-44"
            variant="ghost"
            disabled={isLoading}
            onClick={loadMoreReviews}
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              'もっと見る'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
