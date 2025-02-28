import GenreListSelector from '@/components/genre-list/genre-list-selector';
import GenreListSkeleton from '@/components/genre-list/genre-list-skeleton';
import ErrorElement from '@/routes/error-element';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GenreIdsSelector() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

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
    // SINGLE選択に関しても同じ
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
    <ErrorBoundary fallback={<ErrorElement />}>
      <Suspense fallback={<GenreListSkeleton />}>
        <GenreListSelector activeIds={selectedGenreIds} onClick={handleClickGenre} />
      </Suspense>
    </ErrorBoundary>
  );
}
