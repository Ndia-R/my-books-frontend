import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GenreConditionSelector() {
  const CONDITIONS: string[] = ['SINGLE', 'AND', 'OR'];

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCondition, setSelectedCondition] = useState(CONDITIONS[0]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const conditionQuery = params.get('condition') ?? '';

    setSelectedCondition(conditionQuery);
  }, [location.search]);

  const handleChangeCondition = (condition: string) => {
    setSelectedCondition(condition);

    const params = new URLSearchParams(location.search);

    // SINGLE選択以外は複数ジャンル選択可能OKですが
    // SINGLE選択の場合、複数ジャンルの中の最初の値（単一の値）とする
    let genreIdsQuery = params.get('genreIds') ?? '';
    if (condition === 'SINGLE') {
      genreIdsQuery = genreIdsQuery.split(',')[0];
    }

    params.set('genreIds', genreIdsQuery);
    params.set('condition', condition);
    params.set('page', '1');
    navigate(`/discover?${params.toString()}`);
  };

  return (
    <RadioGroup
      className="flex gap-x-4"
      value={selectedCondition}
      onValueChange={handleChangeCondition}
    >
      {CONDITIONS.map((condition) => (
        <div className="flex items-center" key={condition}>
          <RadioGroupItem value={condition} id={condition} />
          <Label className="cursor-pointer select-none p-2" htmlFor={condition}>
            {condition}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
