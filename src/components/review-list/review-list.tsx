import Pagination from '@/components/pagination';
import ReviewCreateDialog from '@/components/review-list/review-create-dialog';
import ReviewItem from '@/components/review-list/review-item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useApiRevew } from '@/hooks/api/use-api-review';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  bookId: string;
};

export default function ReviewList({ bookId }: Props) {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const { getReviewPage, checkSelfReviewExists } = useApiRevew();

  const { data: reviewPage } = useSuspenseQuery({
    queryKey: ['getReviewPage', bookId, page],
    queryFn: () => getReviewPage(bookId, page),
  });

  // enabledオプションを使って、ログインしていない場合は
  // queryFnを呼び出さない（この指定はuseSuspenseQueryでは出来ない模様）
  const { data: reviewExists = false } = useQuery({
    queryKey: ['checkSelfReviewExists', bookId],
    queryFn: () => checkSelfReviewExists(bookId),
    enabled: !!user,
    retry: false,
  });

  return (
    <div className="mx-auto w-full lg:w-3/4">
      <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
        <p>レビュー {reviewPage.totalItems} 件</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-44 rounded-full bg-transparent"
              variant="outline"
              disabled={user ? reviewExists : true}
              onClick={() => user && setIsOpen(true)}
            >
              {user && reviewExists ? 'レビュー済み' : 'レビューする'}
            </Button>
          </TooltipTrigger>
          {!user && (
            <TooltipContent>
              ログインしてこの本の「レビュー」を書きましょう
            </TooltipContent>
          )}
        </Tooltip>
        <ReviewCreateDialog
          bookId={bookId}
          page={page}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <ul className="flex flex-col p-3 sm:p-6">
        {reviewPage.reviews.map((review) => (
          <li key={review.userId}>
            <Separator className="bg-foreground/10" />
            <ReviewItem review={review} bookId={bookId} page={page} />
          </li>
        ))}
      </ul>

      <div className="mb-4 flex justify-center">
        {reviewPage.totalPages > 1 && (
          <Pagination total={reviewPage.totalPages} page={page} onChangePage={setPage} />
        )}
      </div>
    </div>
  );
}
