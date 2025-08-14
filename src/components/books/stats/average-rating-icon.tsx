import { StarIcon } from 'lucide-react';

type Props = {
  averageRating: number;
};

export default function AverageRatingIcon({ averageRating }: Props) {
  return (
    <div className="text-muted-foreground flex items-center">
      <div className="flex size-8 items-center justify-center">
        <StarIcon className="size-4" />
      </div>
      <div className="flex min-w-4 justify-center text-sm">
        {averageRating.toFixed(1)}
      </div>
    </div>
  );
}
