import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/util';
import { Genre } from '@/types/book';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
  genres: Genre[];
};

export default function GenreSelector({ className, genres }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const SELECT_TYPE = ['AND', 'OR'];
  const [selectType, setSelectType] = useState(SELECT_TYPE[0]);

  const isActive = (id: number) => selectedGenres.includes(id.toString());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlIds = params.get('genreId') ?? '';
    const ids = urlIds === '' ? [] : urlIds.split(',');

    setSelectedGenres(ids);
  }, [location.search]);

  const handleClick = (selectedId: number) => {
    const ids = isActive(selectedId)
      ? selectedGenres.filter((id) => id !== selectedId.toString())
      : [...selectedGenres, selectedId.toString()];

    setSelectedGenres(ids);

    const params = new URLSearchParams(location.search);
    params.set('genreId', ids.join(','));
    params.set('page', '1');
    navigate(`/discover?${params.toString()}`);
  };

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <p className="my-2">ジャンル</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">選択条件</p>
          <Select value={selectType} onValueChange={setSelectType}>
            <SelectTrigger className="w-[100px] border-foreground/20 bg-background/20">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {SELECT_TYPE.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className={cn('flex flex-wrap', className)}>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Button
              className={cn(
                'rounded-full m-1 text-muted-foreground text-xs sm:text-sm',
                isActive(genre.id) && 'text-foreground'
              )}
              variant={isActive(genre.id) ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleClick(genre.id)}
            >
              {isActive(genre.id) ? (
                <CheckIcon className="mr-1 size-4" strokeWidth={4} />
              ) : null}
              {genre.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
