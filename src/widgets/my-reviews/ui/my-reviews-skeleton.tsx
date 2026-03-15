import { MyReviewListSkeleton } from '@/entities/review';

export default function MyReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6"></p>
      <MyReviewListSkeleton />
    </div>
  );
}
