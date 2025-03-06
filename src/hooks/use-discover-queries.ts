import { useLocation, useNavigate } from 'react-router-dom';

export const useDiscoverQueries = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const genreIds = searchParams.get('genreIds') || '';
  const condition = searchParams.get('condition') || '';
  const page = Number(searchParams.get('page') || '1');

  const updateQueryParams = (params: {
    genreIds?: string;
    condition?: string;
    page?: number;
  }) => {
    const newParams = new URLSearchParams(location.search);

    if (params.genreIds !== undefined) {
      newParams.set('genreIds', params.genreIds);
    }
    if (params.condition !== undefined) {
      newParams.set('condition', params.condition);
    }
    if (params.page !== undefined) {
      newParams.set('page', params.page.toString());
    }

    navigate(`/discover?${newParams.toString()}`);
  };

  return { genreIds, condition, page, updateQueryParams };
};
