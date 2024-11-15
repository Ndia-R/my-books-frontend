import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') ?? '';
    setQuery(query);
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;

    const params = new URLSearchParams(location.search);
    params.set('q', query);
    params.set('page', '1');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      <form className="relative h-10 w-64 lg:w-80" onSubmit={handleSubmit}>
        <Input
          className="rounded-full border-foreground/10 pl-10 pr-4"
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
