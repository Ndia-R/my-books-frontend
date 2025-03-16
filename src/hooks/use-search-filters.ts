import { useSearchParams } from 'react-router-dom';

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const genreIds = searchParams.get('genreIds') ?? '';
  const condition = searchParams.get('condition') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const updateQueryParams = (params: {
    q?: string;
    genreIds?: string;
    condition?: string;
    page?: number;
  }) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams.set(key, value.toString());
      }
    });

    setSearchParams(newParams);
  };

  return { q, genreIds, condition, page, updateQueryParams };
};
