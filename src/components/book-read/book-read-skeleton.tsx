import { Skeleton } from '@/components/ui/skeleton';

export default function BookReadSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-8 w-96 rounded-full bg-muted-foreground/5" />
        </div>
        <p className="whitespace-pre-wrap">
          <Skeleton className="my-2 h-4 w-96 rounded-full bg-muted-foreground/5" />
          <Skeleton className="my-2 h-4 w-80 rounded-full bg-muted-foreground/5" />
          <Skeleton className="my-2 h-4 w-64 rounded-full bg-muted-foreground/5" />
        </p>
      </div>
    </>
  );
}
