import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FETCH_MY_REVIEWS_MAX_RESULTS } from '@/constants/constants';

export default function MyReviewsSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-4 pb-4">
        <p className="text-right">
          <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
        </p>
        <ul className="flex flex-col gap-y-2">
          {[...Array<number>(FETCH_MY_REVIEWS_MAX_RESULTS)].map((_, index) => (
            <li key={index}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-x-4">
                    <div className="flex min-w-20 justify-center sm:min-w-24">
                      <Skeleton className="h-24 w-20 rounded bg-muted-foreground/5 object-cover sm:h-28" />
                    </div>
                    <div className="flex w-full flex-col justify-center gap-y-2">
                      <div className="sm:px-4">
                        <Skeleton className="h-6 w-48 rounded-full bg-muted-foreground/5 sm:h-7" />
                        <Skeleton className="my-1 h-4 w-16 rounded-full bg-muted-foreground/5" />
                        <Skeleton className="my-1 h-4 w-32 rounded-full bg-muted-foreground/5" />
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
