import { Skeleton } from '@/components/ui/skeleton';

export default function GenresSkeleton() {
  return (
    <ul className="flex flex-wrap gap-1">
      {[...Array<number>(12)].map((_, index) => (
        <li key={index}>
          <Skeleton
            className="bg-muted-foreground/5 h-8 w-24"
            aria-label="ジャンル情報を読み込み中"
          />
        </li>
      ))}
    </ul>
  );
}
