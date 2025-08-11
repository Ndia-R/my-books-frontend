import Pagination from '@/components/shared/pagination';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { useEffect, useState } from 'react';

type Props = {
  totalPages: number;
};

export default function SearchPagination({ totalPages }: Props) {
  const { page, updateQueryParams } = useSearchFilters();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateQueryParams({ page: newPage });
  };

  return (
    <div className="flex justify-center">
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          page={currentPage}
          onChangePage={handleChange}
        />
      )}
    </div>
  );
}
