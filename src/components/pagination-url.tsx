import Pagination from '@/components/pagination';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  totalPages: number;
};

export default function PaginationUrl({ totalPages }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page') ?? '1');
    setPage(page);
  }, [location.search]);

  const handleChange = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center">
      {totalPages > 1 && (
        <Pagination total={totalPages} page={page} onChangePage={handleChange} />
      )}
    </div>
  );
}
