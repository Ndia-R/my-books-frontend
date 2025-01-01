import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/util';
import { Genre } from '@/types/book';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  genres: Genre[];
};

type ConditionType = {
  id: string;
  value: string;
  splitCode: string;
};

const CONDITIONS: ConditionType[] = [
  { id: 'and-condition', value: 'AND', splitCode: ',' },
  { id: 'or-condition', value: 'OR', splitCode: '|' },
];

const parseGenreIdQuery = (genreIdQuery: string) => {
  for (const condition of CONDITIONS) {
    if (genreIdQuery.includes(condition.splitCode)) {
      return {
        ids: genreIdQuery.split(condition.splitCode).map((id) => Number(id)),
        condition,
      };
    }
  }
  const ids = genreIdQuery ? [Number(genreIdQuery)] : [];
  return { ids, condition: CONDITIONS[0] };
};

export default function GenreSelector({ genres }: Props) {
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
    const ids = isActive(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(ids);

    const genreIdQuery = ids.join(selectedCondition.splitCode);
    updateDiscoverUrl(genreIdQuery);
  };

  const handleValueChange = (value: string) => {
    const selected =
      CONDITIONS.find((condition) => condition.value === value) || CONDITIONS[0];
    setSelectedCondition(selected);

    const genreIdQuery = selectedGenres.join(selected.splitCode);
    updateDiscoverUrl(genreIdQuery);
  };

  const updateDiscoverUrl = (genreIdQuery: string) => {
    const params = new URLSearchParams(location.search);
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
        {genres.map((genre) => (
          <li key={genre.id}>
            <Button
              className={cn(
                'rounded-full m-1 text-muted-foreground text-xs sm:text-sm',
                isActive(genre.id) && 'text-foreground'
              )}
              variant={isActive(genre.id) ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleClickGenre(genre.id)}
            >
              {isActive(genre.id) && (
                <CheckIcon className="mr-1 size-4" strokeWidth={4} />
              )}
              {genre.name}
            </Button>
          </li>
        ))}
      </ul>

      <Separator className="my-4 bg-foreground/10" />
    </>
  );
}
