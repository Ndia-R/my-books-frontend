import GenreList from '@/components/genres/genre-list';
import { queryKeys } from '@/constants/query-keys';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { getGenres } from '@/lib/api/genres';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function GenresSelector() {
  const { genreIds, condition, updateQueryParams } = useSearchFilters();

  const { data: genres } = useSuspenseQuery({
    queryKey: queryKeys.getGenres(),
    queryFn: () => getGenres(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const [selectedGenreIds, isSelectedGenreIds] = useState<number[]>([]);

  useEffect(() => {
    // クエリ文字列から配列へ
    const initSelected = genreIds.split(',').map((genreId) => Number(genreId));
    isSelectedGenreIds(initSelected);
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

    isSelectedGenreIds(newGenreIds);
    updateQueryParams({ genreIds: newGenreIds.join(','), page: 1 });
  };

  return (
    <GenreList
      genres={genres}
      activeIds={selectedGenreIds}
      onClick={handleClick}
    />
  );
}
