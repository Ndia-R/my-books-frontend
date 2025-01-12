import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function GenreSelectorSkeleton() {
  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <Skeleton className="h-10 w-24 rounded-full bg-muted-foreground/5" />
        <div className="flex gap-x-2">
          <Skeleton className="h-10 w-16 rounded-full bg-muted-foreground/5" />
          <Skeleton className="h-10 w-16 rounded-full bg-muted-foreground/5" />
        </div>
      </div>

      <Separator className="my-4 bg-foreground/10" />
      <GenreListSkeleton />
      <Separator className="my-4 bg-foreground/10" />
    </>
  );
}
