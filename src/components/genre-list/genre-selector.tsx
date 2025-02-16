import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { getGenres } from '@/lib/data';
import { cn } from '@/lib/util';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type ConditionType = {
  id: string;
  value: string;
  splitCode: string;
};

const CONDITIONS: ConditionType[] = [
  { id: 'single-condition', value: 'SINGLE', splitCode: 'none' },
  { id: 'and-condition', value: 'AND', splitCode: ',' },
  { id: 'or-condition', value: 'OR', splitCode: '|' },
];

const parseGenreIdQuery = (genreIdQuery: string) => {
  const condition =
    CONDITIONS.find((c) => genreIdQuery.includes(c.splitCode)) || CONDITIONS[0];

  const ids = genreIdQuery
    ? genreIdQuery
        .split(condition.splitCode)
        .map((id) => Number(id))
        .filter((id) => !isNaN(id))
    : [];

  return { ids, condition };
};

export default function GenreSelector() {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<ConditionType>(
    CONDITIONS[0]
  );

  const isActive = (id: number) => selectedGenres.includes(id);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreIdQuery = params.get('genreId') ?? '';

    const { ids, condition } = parseGenreIdQuery(genreIdQuery);

    setSelectedGenres(ids);
    if (ids.length > 1) setSelectedCondition(condition);
  }, [location.search]);

  const handleClickGenre = (genreId: number) => {
    let newSelectedGenres: number[];

    if (selectedCondition.id === 'single-condition') {
      newSelectedGenres = [genreId];
    } else if (isActive(genreId)) {
      newSelectedGenres =
        selectedGenres.length > 1
          ? selectedGenres.filter((id) => id !== genreId)
          : selectedGenres;
    } else {
      newSelectedGenres = [...selectedGenres, genreId].sort((a, b) => a - b);
    }

    setSelectedGenres(newSelectedGenres);
    updateDiscoverUrl(newSelectedGenres.join(selectedCondition.splitCode));
  };

  const handleValueChange = (value: string) => {
    const selected =
      CONDITIONS.find((condition) => condition.value === value) ?? CONDITIONS[0];
    setSelectedCondition(selected);

    const genreIdQuery =
      value === 'SINGLE'
        ? (selectedGenres[0]?.toString() ?? '')
        : selectedGenres.join(selected.splitCode);
    updateDiscoverUrl(genreIdQuery);
  };

  const updateDiscoverUrl = (genreIdQuery: string) => {
    const params = new URLSearchParams();
    params.set('genreId', genreIdQuery);
    params.set('page', '1');
    navigate(`/discover?${params.toString()}`);
  };

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <p className="my-2">ジャンル</p>
        <RadioGroup
          className="flex gap-x-4"
          value={selectedCondition.value}
          onValueChange={handleValueChange}
        >
          {CONDITIONS.map((condition) => (
            <div className="flex items-center" key={condition.id}>
              <RadioGroupItem value={condition.value} id={condition.id} />
              <Label className="cursor-pointer select-none p-2" htmlFor={condition.id}>
                {condition.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-4 bg-foreground/10" />

      <ul className="flex flex-wrap">
        {genres.map((genre) => {
          const active = isActive(genre.id);
          return (
            <li key={genre.id}>
              <Button
                className={cn(
                  'rounded-full m-1 text-muted-foreground text-xs sm:text-sm',
                  active && 'text-foreground'
                )}
                variant={active ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleClickGenre(genre.id)}
              >
                {active && <CheckIcon className="mr-1 size-4" strokeWidth={4} />}
                {genre.name}
              </Button>
            </li>
          );
        })}
      </ul>

      <Separator className="my-4 bg-foreground/10" />
    </>
  );
}
