import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyReviewsSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-4 pb-4">
        <p className="h-6"></p>
        <ul className="flex flex-col gap-y-2">
          {[...Array<number>(5)].map((_, index) => (
            <li key={index}>
              <Card className="p-0">
                <CardContent className="p-4">
                  <div className="flex gap-x-4">
                    <div className="flex min-w-20 justify-center sm:min-w-24">
                      <Skeleton
                        className="bg-muted-foreground/5 h-24 w-20 rounded-xs object-cover sm:h-28"
                        aria-label="レビュー対象書籍の表紙を読み込み中"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Skeleton
                        className="bg-muted-foreground/5 h-6 w-32 sm:h-7 sm:w-64"
                        aria-label="書籍タイトルを読み込み中"
                      />
                      <div className="flex flex-col gap-y-1">
                        <Skeleton
                          className="bg-muted-foreground/5 my-1 h-4 w-48 sm:w-96"
                          aria-label="レビューコメントを読み込み中"
                        />
                        <Skeleton
                          className="bg-muted-foreground/5 my-1 h-4 w-40 sm:w-80"
                          aria-label="レビューコメントを読み込み中"
                        />
                        <Skeleton
                          className="bg-muted-foreground/5 my-1 h-4 w-32 sm:w-64"
                          aria-label="レビューコメントを読み込み中"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
