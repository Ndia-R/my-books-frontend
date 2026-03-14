import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useSearchFilters } from '@/features/book-search/model/use-search-filters';
import { buildQueryString } from '@/shared/api/url-builder';
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

    if (!newQuery) return;

    const queryString = buildQueryString({ q: newQuery, page: 1 });
    const searchUrl = '/search' + queryString;

    navigate(searchUrl);
  };

  return (
    <div className="w-48 sm:w-64">
      <form className="relative w-full" onSubmit={handleSubmit}>
        <Input
          className="border-foreground/20 bg-background/20 pr-10 pl-4"
          type="search"
          placeholder="タイトルで検索"
          name="query"
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="書籍検索"
        />
        <Button
          className="absolute top-0 right-0 rounded-l-none"
          type="submit"
          size="icon"
          variant="ghost"
          aria-label="検索"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
}
