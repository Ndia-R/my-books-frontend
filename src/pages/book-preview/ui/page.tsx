import BookReadBackground from '@/widgets/book-reading/ui/book-read-background';
import BookReadContent from '@/widgets/book-reading/ui/book-read-content';
import BookReadContentSkeleton from '@/widgets/book-reading/ui/book-read-content-skeleton';
import ErrorElement from '@/shared/ui/error-element';
import { SubscriptionPlan } from '@/shared/config/subscription-plans';
import { buildPath } from '@/shared/api/url-builder';
import { useAuth } from '@/entities/user';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';
  const chapterNumber = Number(params.chapterNumber) || 1;
  const pageNumber = Number(params.pageNumber) || 1;

  const navigate = useNavigate();
  const { isAuthenticated, hasPlan } = useAuth();

  useEffect(() => {
    // 認証されていてプレミアムプランに加入している場合、通常の読書ページへリダイレクト
    if (isAuthenticated && hasPlan(SubscriptionPlan.PREMIUM)) {
      const path = buildPath(
        '/read-content/:bookId/chapter/:chapterNumber/page/:pageNumber',
        {
          bookId,
          chapterNumber,
          pageNumber,
        }
      );
      navigate(path, { replace: true });
    }
  }, [isAuthenticated, hasPlan, navigate, bookId, chapterNumber, pageNumber]);

  return (
    <>
      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={null}>
          <BookReadBackground bookId={bookId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<BookReadContentSkeleton />}>
          <BookReadContent
            bookId={bookId}
            chapterNumber={chapterNumber}
            pageNumber={pageNumber}
            isPreviewMode={true}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
