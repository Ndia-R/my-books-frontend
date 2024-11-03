import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-4 p-4">
        <Skeleton className="h-12 w-3/5 rounded-full" />
        <div className="flex w-full items-center justify-end">
          <Skeleton className="h-8 w-1/5 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 sm:flex-row">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col items-center gap-y-6">
            <Skeleton className="h-80 w-64 rounded" />
            <Skeleton className="h-10 w-32 rounded-lg" />
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-5 w-48 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <Skeleton className="h-5 w-3/5 rounded-full" />
          <Skeleton className="h-5 w-4/5 rounded-full" />
          <Skeleton className="h-5 w-2/5 rounded-full" />
          <div className="h-5"></div>
          <Skeleton className="h-5 w-3/5 rounded-full" />
          <Skeleton className="h-5 w-2/5 rounded-full" />
        </div>
      </div>
    </>
  );
}
