import GenreList from '@/entities/genre/ui/genre-list';
import { queryKeys } from '@/constants/query-keys';
import { useSearchFilters } from '@/features/book-search/model/use-search-filters';
import { getGenres } from '@/entities/genre/api/genres';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GenresSelector() {
  const { data: genres } = useSuspenseQuery({
    queryKey: queryKeys.getGenres(),
    queryFn: () => getGenres(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { genreIds, condition, updateQueryParams } = useSearchFilters();

  // クエリ文字列から配列へ直接派生
  const selectedGenreIds = genreIds.split(',').map((genreId) => Number(genreId));

  const handleClick = (genreId: number) => {
    let newGenreIds = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId].sort((a, b) => a - b);

    // 最後の一つをクリックした場合、空配列になるので必ず１つは選択になるようにする
    // SINGLE選択に関しては必ず１つの選択になる
    if (newGenreIds.length === 0 || condition === 'SINGLE') {
      newGenreIds = [genreId];
    }

    // クエリパラメータを更新すると、genreIdsが変更され、selectedGenreIdsが自動的に再計算される
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
