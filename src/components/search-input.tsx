import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchInput() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') ?? '';
    setQuery(query);
  }, [location.search]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;

    const params = new URLSearchParams();
    params.set('q', query);
    params.set('page', '1');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-44 sm:w-64">
      <form className="relative h-10 w-full" onSubmit={handleSubmit}>
        <Input
          className="rounded-full border-foreground/20 bg-background/20 pl-10 pr-4"
          type="search"
          placeholder="検索"
          name="query"
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-2.5 top-2.5 size-5" />
      </form>
    </div>
  );
}
