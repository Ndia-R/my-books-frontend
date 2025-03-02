import GenreListSelector from '@/components/genres/genre-list-selector';
import { useApiGenre } from '@/hooks/api/use-api-genre';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GenresDiscover() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const { getGenres } = useApiGenre();

  const { data: genres } = useSuspenseQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreIdsQuery = params.get('genreIds') ?? '';

    const ids = genreIdsQuery.split(',').map((genreId) => Number(genreId));
    setSelectedGenreIds(ids);
  }, [location.search]);

  const handleClickGenre = (genreId: number) => {
    let newGenreIds = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId].sort((a, b) => a - b);

    const params = new URLSearchParams(location.search);

    // 最後の一つをクリックした場合、空配列になるので必ず１つは選択になるようにする
    // SINGLE選択に関しては必ず１つの選択になる
    const isSingleCondition = params.get('condition') === 'SINGLE';
    if (newGenreIds.length === 0 || isSingleCondition) {
      newGenreIds = [genreId];
    }

    setSelectedGenreIds(newGenreIds);

    const genreIdsQuery = newGenreIds.join(',');

    params.set('genreIds', genreIdsQuery);
    params.set('page', '1');
    navigate(`/discover?${params.toString()}`);
  };

  return (
    <GenreListSelector
      genres={genres}
      activeIds={selectedGenreIds}
      onClick={handleClickGenre}
    />
  );
}
