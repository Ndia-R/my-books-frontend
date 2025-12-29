import { Input } from '@/components/ui/input';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { buildQueryString } from '@/lib/utils';
import { Search } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchInput() {
  const { q } = useSearchFilters();
  const navigate = useNavigate();

  const [query, setQuery] = useState(q);

  // URLパラメータが変わったら、入力欄も同期
  // 複数のSearchInputが存在する場合（ヘッダーとヒーローエリア）の同期に必要
  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuery = query.trim();

    if (!newQuery) {
      navigate('/');
      return;
    }

    const queryString = buildQueryString({ q: newQuery, page: 1 });
    const searchUrl = '/search' + queryString;

    navigate(searchUrl);
  };

  return (
    <div className="w-44 sm:w-64">
      <form className="relative w-full" onSubmit={handleSubmit}>
        <Input
          className="border-foreground/20 bg-background/20 pr-4 pl-8"
          type="search"
          placeholder="タイトルで検索"
          name="query"
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute top-2.5 left-2.5 size-4" />
      </form>
    </div>
  );
}
