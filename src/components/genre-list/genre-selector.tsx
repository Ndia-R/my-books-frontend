import GenreListSelector from '@/components/genre-list/genre-list-selector';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import ErrorElement from '@/routes/error-element';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';

type ConditionType = {
  value: string;
  splitCode: string;
};

const CONDITIONS: ConditionType[] = [
  { value: 'OR', splitCode: '|' },
  { value: 'AND', splitCode: ',' },
];

export default function GenreSelector() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const genreIdQuery = params.get('genreId') ?? '';

  const initCondition =
    CONDITIONS.find((conditon) => genreIdQuery.includes(conditon.splitCode)) ||
    CONDITIONS[0];

  const splitCodes = CONDITIONS.map((conditon) => conditon.splitCode).join();
  const regex = new RegExp(`[${splitCodes}]`);
  const initGenreIds = genreIdQuery.split(regex).map((genreId) => Number(genreId));

  const [selectedCondition, setSelectedCondition] = useState(initCondition);
  const [selectedGenreIds, setSelectedGenreIds] = useState(initGenreIds);

  const handleClickGenre = (genreId: number) => {
    let newGenreIds = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId].sort((a, b) => a - b);

    if (newGenreIds.length === 0) {
      newGenreIds = [genreId];
    }

    setSelectedGenreIds(newGenreIds);
    updateDiscoverUrl(newGenreIds.join(selectedCondition.splitCode));
  };

  const handleChangeCondition = (value: string) => {
    const newCondition =
      CONDITIONS.find((condition) => condition.value === value) ?? CONDITIONS[0];

    setSelectedCondition(newCondition);
    updateDiscoverUrl(selectedGenreIds.join(newCondition.splitCode));
  };

  const updateDiscoverUrl = (genreIdQuery: string) => {
    const params = new URLSearchParams();
    params.set('genreId', genreIdQuery);
    params.set('page', '1');
    navigate(`/discover?${params.toString()}`, { replace: true });
  };

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <p className="my-2">ジャンル</p>
        <RadioGroup
          className="flex gap-x-4"
          value={selectedCondition.value}
          onValueChange={handleChangeCondition}
        >
          {CONDITIONS.map((condition) => (
            <div className="flex items-center" key={condition.value}>
              <RadioGroupItem value={condition.value} id={condition.value} />
              <Label className="cursor-pointer select-none p-2" htmlFor={condition.value}>
                {condition.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ErrorBoundary fallback={<ErrorElement />}>
        <Suspense fallback={<GenreListSkeleton />}>
          <GenreListSelector activeIds={selectedGenreIds} onClick={handleClickGenre} />
        </Suspense>
      </ErrorBoundary>

      <Separator className="my-4 bg-foreground/10" />
    </>
  );
}
