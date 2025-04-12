import { Skeleton } from '@/components/ui/skeleton';

export default function GenresSkeleton() {
  return (
    <ul className="flex flex-wrap">
      {[...Array<number>(12)].map((_, index) => (
        <li key={index}>
          <Skeleton className="bg-muted-foreground/5 m-1 h-9 w-24 rounded-full" />
        </li>
      ))}
    </ul>
  );
}
