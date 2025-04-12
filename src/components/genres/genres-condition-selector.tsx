import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSearchFilters } from '@/hooks/use-search-filters';
import { useState } from 'react';

const CONDITION_LIST = [
  { text: '単一選択', value: 'SINGLE' },
  { text: 'AND条件', value: 'AND' },
  { text: 'OR条件', value: 'OR' },
];

export default function GenresConditionSelector() {
  const { genreIds, condition, updateQueryParams } = useSearchFilters();
  const [currentCondition, setCurrentCondition] = useState(condition);

  const handleChange = (newCondition: string) => {
    // SINGLE選択以外は複数ジャンル選択可能OKだが
    // SINGLE選択の場合、複数ジャンルの中の最初の値（単一の値）とする
    const ids = newCondition === 'SINGLE' ? genreIds.split(',')[0] : undefined;
    setCurrentCondition(newCondition);
    updateQueryParams({ genreIds: ids, condition: newCondition, page: 1 });
  };

  return (
    <RadioGroup
      className="flex gap-x-4"
      value={currentCondition}
      onValueChange={handleChange}
    >
      {CONDITION_LIST.map((item) => (
        <div
          className="flex flex-col-reverse items-center sm:flex-row"
          key={item.value}
        >
          <RadioGroupItem value={item.value} id={item.value} />
          <Label
            className="cursor-pointer p-2 text-xs select-none sm:text-sm"
            htmlFor={item.value}
          >
            {item.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
