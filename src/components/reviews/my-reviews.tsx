import MyReviewList from '@/components/reviews/my-review-list';
import { queryKeys } from '@/constants/query-keys';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { getUserReviews } from '@/lib/api/user';
import { Review } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

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

  const loadMoreReviews = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const nextReviewPage = await getUserReviews(nextPage);
      setReviews((prevReviews) => [...prevReviews, ...nextReviewPage.data]);
      setCurrentPage(nextPage);
    } catch {
      toast.error('レビューの読み込みに失敗しました', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, isLoading]);

  // 無限スクロール用のトリガー要素のref
  const triggerRef = useIntersectionObserver(
    loadMoreReviews,
    currentPage < totalPages && !isLoading
  );

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {initialReviewPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <MyReviewList reviews={reviews} />

      {currentPage < totalPages && (
        <div ref={triggerRef} className="flex h-16 items-center justify-center">
          {isLoading && (
            <Loader2Icon 
              className="text-muted-foreground animate-spin" 
              aria-label="レビューを読み込み中"
              role="status" 
            />
          )}
        </div>
      )}
    </div>
  );
}
