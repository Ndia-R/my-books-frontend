import { cn } from '@/lib/util';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  rating: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
};

export default function Rating({ rating, max = 5, readOnly = false, onChange }: Props) {
  // 評価が最大を超えていたら、最大にする
  const initRating = rating > max ? max : rating;

  const [currentRating, setCurrentRating] = useState(initRating);
  const [dispRating, setDispRating] = useState(initRating);

  const handleMouseClick = (newDispRating: number) => {
    if (readOnly) return;
    setDispRating(newDispRating);
    setCurrentRating(newDispRating);
    if (onChange) {
      onChange(newDispRating);
    }
  };

  const handleMouseEnter = (newDispRating: number) => {
    if (readOnly) return;
    setDispRating(newDispRating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setDispRating(currentRating);
  };

  return (
    <>
      <div className="flex h-10 items-center text-foreground">
        <p
          className={cn('w-8', currentRating !== dispRating && 'text-foreground/40')}
          onClick={() => handleMouseClick(0)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {dispRating.toFixed(1)}
        </p>

        {[...Array<number>(max)].map((_, index) => (
          <div className="flex" key={index}>
            <div className="w-3 overflow-hidden">
              <StarIcon
                className={cn(index + 1 - 0.5 > dispRating && 'text-foreground/10')}
                onClick={() => handleMouseClick(index + 1 - 0.5)}
                onMouseEnter={() => handleMouseEnter(index + 1 - 0.5)}
                onMouseLeave={() => handleMouseLeave()}
              />
            </div>
            <div className="w-3 overflow-hidden">
              <StarIcon
                className={cn(
                  index + 1 > dispRating && 'text-foreground/10',
                  '-translate-x-3'
                )}
                onClick={() => handleMouseClick(index + 1)}
                onMouseEnter={() => handleMouseEnter(index + 1)}
                onMouseLeave={() => handleMouseLeave()}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
