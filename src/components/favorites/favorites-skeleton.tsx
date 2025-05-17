import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritesSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <ul className="flex flex-col gap-y-2">
        {[...Array<number>(5)].map((_, index) => (
          <li key={index}>
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="flex gap-x-4">
                  <div className="flex min-w-20 justify-center sm:min-w-24">
                    <Skeleton className="bg-muted-foreground/5 h-24 w-20 rounded-xs object-cover sm:h-28" />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Skeleton className="bg-muted-foreground/5 h-6 w-64 sm:h-7" />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton className="bg-muted-foreground/5 my-1 h-4 w-96" />
                      <Skeleton className="bg-muted-foreground/5 my-1 h-4 w-80" />
                      <Skeleton className="bg-muted-foreground/5 my-1 h-4 w-64" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
