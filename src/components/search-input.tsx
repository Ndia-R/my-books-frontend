import { Input } from '@/components/ui/input';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { Search } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchInput() {
  const { q, updateQueryParams } = useSearchFilters();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuery = query.trim();
    if (!newQuery) return;

    // `/search` 以外のページなら遷移する。それ以外はクエリパラメータだけ更新
    if (location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    } else {
      updateQueryParams({ q: newQuery, page: 1 });
    }
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
