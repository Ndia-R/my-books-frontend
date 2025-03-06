import GenreList from '@/components/genres/genre-list';
import { useApiGenre } from '@/hooks/api/use-api-genre';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Props = {
  genreIds: string;
  condition: string;
  onGenreIdsChange: (genreIds: string) => void;
};

export default function GenresDiscover({ genreIds, condition, onGenreIdsChange }: Props) {
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const { getGenres } = useApiGenre();

  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

  useEffect(() => {
    const ids = genreIds.split(',').map((genreId) => Number(genreId));
    setSelectedGenreIds(ids);
  }, [genreIds]);

  const handleClick = (genreId: number) => {
    let newGenreIds = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId].sort((a, b) => a - b);

    // 最後の一つをクリックした場合、空配列になるので必ず１つは選択になるようにする
    // SINGLE選択に関しては必ず１つの選択になる
    if (newGenreIds.length === 0 || condition === 'SINGLE') {
      newGenreIds = [genreId];
    }
    setSelectedGenreIds(newGenreIds);
    onGenreIdsChange(newGenreIds.join(','));
  };

  return <GenreList genres={genres} activeIds={selectedGenreIds} onClick={handleClick} />;
}
